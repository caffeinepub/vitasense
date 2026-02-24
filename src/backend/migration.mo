import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
  public type AgeRange = {
    #_18to24;
    #_25to34;
    #_35to44;
    #_45to54;
    #_55to64;
    #_65to74;
    #_75plus;
  };

  public type OldUserProfile = {
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

  public type OldActor = {
    profiles : Map.Map<Principal, OldUserProfile>;
    healthLogs : Map.Map<Principal, [HealthLogEntry]>;
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

  public type NewUserProfile = {
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

  public type NewActor = {
    digitalDetoxUsers : Map.Map<Principal, NewUserProfile>;
  };

  public func run(_old : OldActor) : NewActor {
    {
      digitalDetoxUsers = Map.empty<Principal, NewUserProfile>();
    };
  };
};
