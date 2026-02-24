import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  module HealthLogEntry {
    public func compare(a : HealthLogEntry, b : HealthLogEntry) : Order.Order {
      if (a.timestamp > b.timestamp) { #less } else if (a.timestamp < b.timestamp) {
        #greater;
      } else { #equal };
    };
  };

  public type AgeRange = {
    #_18to24;
    #_25to34;
    #_35to44;
    #_45to54;
    #_55to64;
    #_65to74;
    #_75plus;
  };

  public type UserProfile = {
    name : Text;
    ageRange : AgeRange;
    healthGoals : Text;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type HealthLogEntry = {
    timestamp : Time.Time;
    mood : Nat8; // 1-5
    sleepHours : Nat8; // in hours
    notes : Text;
  };

  public type Challenge = {
    id : Nat;
    name : Text;
    description : Text;
    startDate : Time.Time;
    endDate : Time.Time;
    progress : Nat;
    completed : Bool;
  };

  public type FocusSession = {
    sessionDate : Time.Time;
    durationMinutes : Nat;
  };

  public type Level = {
    #beginner;
    #consistent;
    #focusedMind;
    #digitalMaster;
  };

  public type DigitalDetoxUser = {
    callerUid : Principal;
    name : Text;
    email : Text;
    dailyLimit : Nat;
    currentScreenTime : Nat;
    streak : Nat;
    totalPoints : Nat;
    level : Level;
    challenges : [Challenge];
    focusSessions : [FocusSession];
    createdAt : Time.Time;
  };

  // Unified persistent storage using principal as key
  let digitalDetoxUsers = Map.empty<Principal, DigitalDetoxUser>();

  // Digital Detox Challenges system
  let defaultChallenges : [Challenge] = [
    {
      id = 1;
      name = "7-Day Detox";
      description = "Avoid unnecessary screen time for 7 days";
      startDate = 0;
      endDate = 0;
      progress = 0;
      completed = false;
    },
    {
      id = 2;
      name = "No Social Media Sunday";
      description = "Stay off social media every Sunday";
      startDate = 0;
      endDate = 0;
      progress = 0;
      completed = false;
    },
    {
      id = 3;
      name = "2 Hours No Phone Before Sleep";
      description = "No phone use 2 hours before bedtime";
      startDate = 0;
      endDate = 0;
      progress = 0;
      completed = false;
    },
  ];

  // Required profile management functions per instructions
  public query ({ caller }) func getCallerUserProfile() : async (?DigitalDetoxUser) {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    digitalDetoxUsers.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async (?DigitalDetoxUser) {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    digitalDetoxUsers.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : DigitalDetoxUser) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };

    digitalDetoxUsers.add(caller, profile);
  };

  // Challenge management functions
  public shared ({ caller }) func createChallenge(name : Text, description : Text, startDate : Time.Time, endDate : Time.Time) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can create challenges");
    };

    let creatorUid = caller;
    let newChallenge : Challenge = {
      id = name.size(); // Use string size as fallback for unique identifier.
      name;
      description;
      startDate;
      endDate;
      progress = 0;
      completed = false;
    };

    let existingChallenges = switch (digitalDetoxUsers.get(creatorUid)) {
      case (null) { [] };
      case (?profile) { profile.challenges };
    };

    let updatedChallenges = [newChallenge].concat(existingChallenges);
    digitalDetoxUsers.add(
      creatorUid,
      switch (digitalDetoxUsers.get(creatorUid)) {
        case (null) {
          Runtime.trap("User profile not found. Please create a new profile first.")
        };
        case (?profile) {
          { profile with challenges = updatedChallenges };
        };
      },
    );
  };

  public shared ({ caller }) func updateChallengeProgress(challengeId : Nat, progress : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update challenge progress");
    };

    let creatorUid = caller;
    let existingChallenges = switch (digitalDetoxUsers.get(creatorUid)) {
      case (null) { [] };
      case (?profile) { profile.challenges };
    };

    let updatedChallenges = existingChallenges.map(
      func(ch) {
        if (ch.id == challengeId) {
          { ch with progress = progress };
        } else { ch };
      }
    );

    digitalDetoxUsers.add(
      creatorUid,
      switch (digitalDetoxUsers.get(creatorUid)) {
        case (null) {
          Runtime.trap("User profile not found. Please create a new profile first.");
        };
        case (?profile) {
          { profile with challenges = updatedChallenges };
        };
      },
    );
  };

  // Rewards and Gamification system
  public shared ({ caller }) func addPoints(points : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can add points");
    };

    let userUid = caller;
    let userProfile = switch (digitalDetoxUsers.get(userUid)) {
      case (null) { null };
      case (?profile) { ?profile };
    };

    switch (userProfile) {
      case (null) {
        Runtime.trap("User profile not found. Please create a new profile first");
      };
      case (?existingProfile) {
        let updatePoints = points + existingProfile.totalPoints;

        // Determine new level based on total points
        let newLevel = if (updatePoints >= 0 and updatePoints < 100) {
          #beginner;
        } else if (updatePoints >= 100 and updatePoints < 400) {
          #consistent;
        } else if (updatePoints >= 400 and updatePoints < 900) {
          #focusedMind;
        } else {
          #digitalMaster;
        };

        digitalDetoxUsers.add(
          userUid,
          { existingProfile with totalPoints = updatePoints; level = newLevel },
        );
      };
    };
  };

  //fetch challenge progress
  public query ({ caller }) func getChallengeProgress() : async [Challenge] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can fetch challenge progress");
    };

    switch (digitalDetoxUsers.get(caller)) {
      case (null) { Runtime.trap("User profile not found. Please create a new profile first") };
      case (?profile) { profile.challenges };
    };
  };

  public shared ({ caller }) func saveFocusSession(durationMinutes : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save focus sessions");
    };

    let session : FocusSession = {
      sessionDate = Time.now();
      durationMinutes;
    };

    let currentSessions = switch (digitalDetoxUsers.get(caller)) {
      case (null) { [] };
      case (?profile) { profile.focusSessions };
    };

    digitalDetoxUsers.add(
      caller,
      switch (digitalDetoxUsers.get(caller)) {
        case (null) {
          Runtime.trap("User profile not found. Please create a new profile first.");
        };
        case (?profile) {
          {
            profile with
            focusSessions = [session].concat(currentSessions);
          };
        };
      },
    );
  };

  public query ({ caller }) func getFocusSessions() : async [FocusSession] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can fetch focus sessions");
    };

    switch (digitalDetoxUsers.get(caller)) {
      case (null) { [] };
      case (?profile) { profile.focusSessions };
    };
  };

  // Admin function to view all user profiles
  public query ({ caller }) func getAllUserProfiles() : async [(Principal, DigitalDetoxUser)] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all profiles");
    };
    digitalDetoxUsers.entries().toArray();
  };
};
