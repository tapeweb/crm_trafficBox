import { Role } from "@prisma/client";
import { RolesType } from "../types/user.types.ts";

export const normalizeRole = (role: RolesType): Role => {
    switch (role) {
        case "Admin":
            return Role.Admin;
        case "User":
            return Role.User;
        case "Guest":
            return Role.Guest;
        case "Developer":
            return Role.Developer;
        case "Banned":
            return Role.Banned;
        case "V.I.P":
            return Role.VIP;
        default:
            throw new Error(`Unknown role: ${role}`);
    }
};