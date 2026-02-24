import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface FocusSession {
    sessionDate: Time;
    durationMinutes: bigint;
}
export interface DigitalDetoxUser {
    streak: bigint;
    focusSessions: Array<FocusSession>;
    name: string;
    createdAt: Time;
    callerUid: Principal;
    email: string;
    level: Level;
    dailyLimit: bigint;
    currentScreenTime: bigint;
    totalPoints: bigint;
    challenges: Array<Challenge>;
}
export interface Challenge {
    id: bigint;
    endDate: Time;
    name: string;
    completed: boolean;
    description: string;
    progress: bigint;
    startDate: Time;
}
export enum Level {
    beginner = "beginner",
    focusedMind = "focusedMind",
    consistent = "consistent",
    digitalMaster = "digitalMaster"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addPoints(points: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createChallenge(name: string, description: string, startDate: Time, endDate: Time): Promise<void>;
    getAllUserProfiles(): Promise<Array<[Principal, DigitalDetoxUser]>>;
    getCallerUserProfile(): Promise<DigitalDetoxUser | null>;
    getCallerUserRole(): Promise<UserRole>;
    getChallengeProgress(): Promise<Array<Challenge>>;
    getFocusSessions(): Promise<Array<FocusSession>>;
    getUserProfile(user: Principal): Promise<DigitalDetoxUser | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: DigitalDetoxUser): Promise<void>;
    saveFocusSession(durationMinutes: bigint): Promise<void>;
    updateChallengeProgress(challengeId: bigint, progress: bigint): Promise<void>;
}
