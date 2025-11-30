export const validRoles = ["Admin", "User", "Guest", "Developer", "Banned", "V.I.P"] as const;
export type RolesType = typeof validRoles[number];

export const validGender = ["Male", "Female", "Other"] as const;
export type GenderType = typeof validGender[number];

export interface CreateUserData {
    name: string;
    surname: string;
    email: string;
    password: string;
    gender: GenderType;
    age: number;
    balance: number;
    role: RolesType;
}

export interface UserData {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    gender: string;
    age: number;
    balance: number;
    role: RolesType;
}

export interface CheckAuthData {
    email: string;
    password: string;
}