import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Donation {
    donorName: string;
    email: string;
    message: string;
    timestamp: Time;
    panNumber: string;
    phone: string;
    amount: bigint;
}
export type Time = bigint;
export interface Sponsorship {
    designation: string;
    tier: SponsorshipTier;
    contactPerson: string;
    email: string;
    timestamp: Time;
    companyName: string;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export enum SponsorshipTier {
    bronze = "bronze",
    gold = "gold",
    silver = "silver"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllDonations(): Promise<Array<Donation>>;
    getAllSponsorships(): Promise<Array<Sponsorship>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getNotificationEmail(): Promise<string>;
    getTopDonors(): Promise<Array<Donation>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitDonation(donation: Donation): Promise<void>;
    submitSponsorship(sponsorship: Sponsorship): Promise<void>;
    updateNotificationEmail(email: string): Promise<void>;
}
