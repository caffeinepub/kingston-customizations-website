import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface UserProfile {
    name: string;
}
export interface ImageMetadata {
    imageType: ImageType;
    description: string;
    uploadTimestamp: bigint;
    filename: string;
}
export enum ImageType {
    png = "png",
    jpeg = "jpeg",
    webp = "webp"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllImageMetadata(): Promise<Array<[string, ImageMetadata]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getHomepageImage(): Promise<ExternalBlob | null>;
    getImageMetadata(category: string): Promise<ImageMetadata | null>;
    getLogoImage(): Promise<ExternalBlob | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initializeAccessControl(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    uploadHomepageImage(blob: ExternalBlob, filename: string, timestamp: bigint, imageType: ImageType): Promise<void>;
    uploadImage(blob: ExternalBlob, filename: string, timestamp: bigint, imageType: ImageType, category: string, description: string): Promise<void>;
    uploadLogo(blob: ExternalBlob, filename: string, timestamp: bigint, imageType: ImageType): Promise<void>;
}
