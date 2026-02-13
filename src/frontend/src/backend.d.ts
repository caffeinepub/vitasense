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
export interface UserProfile {
    ageRange: AgeRange;
    name: string;
    createdAt: Time;
    updatedAt: Time;
    healthGoals: string;
}
export interface HealthLogEntry {
    mood: number;
    notes: string;
    timestamp: Time;
    sleepHours: number;
}
export enum AgeRange {
    _45to54 = "_45to54",
    _75plus = "_75plus",
    _25to34 = "_25to34",
    _55to64 = "_55to64",
    _18to24 = "_18to24",
    _35to44 = "_35to44",
    _65to74 = "_65to74"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createHealthLogEntry(mood: number, sleepHours: number, notes: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getHealthLogEntries(): Promise<Array<HealthLogEntry>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(name: string, ageRange: AgeRange, healthGoals: string): Promise<void>;
}
