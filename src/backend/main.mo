import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

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

  // Persistent storage for profiles and health logs
  let profiles = Map.empty<Principal, UserProfile>();
  let healthLogs = Map.empty<Principal, [HealthLogEntry]>();

  public query ({ caller }) func getCallerUserProfile() : async (?UserProfile) {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    profiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async (?UserProfile) {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    profiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(name : Text, ageRange : AgeRange, healthGoals : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };

    let now = Time.now();
    let existing = profiles.get(caller);

    let newProfile : UserProfile = {
      name;
      ageRange;
      healthGoals;
      createdAt = switch (existing) {
        case (?profile) { profile.createdAt };
        case (null) { now };
      };
      updatedAt = now;
    };

    profiles.add(caller, newProfile);
  };

  public shared ({ caller }) func createHealthLogEntry(mood : Nat8, sleepHours : Nat8, notes : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can create health log entries");
    };

    let entry : HealthLogEntry = {
      timestamp = Time.now();
      mood;
      sleepHours;
      notes;
    };

    let currentEntries = switch (healthLogs.get(caller)) {
      case (null) { [] };
      case (?entries) { entries };
    };

    healthLogs.add(
      caller,
      [entry].concat(currentEntries),
    );
  };

  public query ({ caller }) func getHealthLogEntries() : async [HealthLogEntry] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can fetch health log entries");
    };

    switch (healthLogs.get(caller)) {
      case (null) { [] };
      case (?entries) { entries.sort() };
    };
  };
};
