import {prisma} from "../config/database.ts"

import {generateTokenUtils} from "../utils/generateToken.utils.ts"
import {hashingPassword} from "../utils/hashPassword.utils.ts"
import {checkData} from "../utils/checkData.utils.ts"
import {normalizeRole} from "../utils/roleMapper.utils.ts";

import {CheckAuthData, CreateUserData, RolesType, validRoles} from "../types/user.types.ts"

/**
 * Creating new user.
 */

export const createUser = async (userData: CreateUserData) => {
    const { name, surname, email, password, gender, age, role } = userData;

    if(!password) throw new Error("Password is required.");
    if(age < 16) throw new Error("User must be at least 16 years old.");

    const exists = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(!exists) throw new Error("User already exists.");

    const hashedPassword = await hashingPassword(password, 10);
    const token = generateTokenUtils(32, "hex");

    const user = await prisma.user.create({
        data: {
            name,
            surname,
            email,
            password: hashedPassword,
            gender,
            age,
            role: normalizeRole(role),
            balance: 0,
            token,
        },
    });

    return { token: user.token, message: "User successfully created." };
};

/**
 * Check data user for login
 */

export const checkUser = async (data: CheckAuthData) => {
    const { email, password } = data;

    if(!password) throw new Error("Password is required.");

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if(!user) throw new Error("User not found.");

    const match = await checkData(password, user.password);
    if(!match) throw new Error("Invalid credentials.");

    return { token: user.token, message: "Login successfully." };
};

/**
 * Get current user from token
 */
export const getCurrentUser = async (token: string) => {
    const user = await prisma.user.findUnique({
        where: {
            token
        }
    });
    if(!user) throw new Error("User not found.");

    return {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        age: user.age,
        gender: user.gender,
        role: user.role,
        balance: user.balance,
    };
};

/**
 * Get all users
 */

export const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            age: true,
            gender: true,
            role: true,
            balance: true,
        },
    });
};

/**
 * Get user role from token
 */
export const getUserRole = async (token: string): Promise<RolesType> => {
    const user = await getCurrentUser(token);

    if (Object.values(validRoles).includes(user.role as RolesType)) {
        return user.role as RolesType;
    }

    throw new Error("Invalid user role.");
};

/**
 * Delete user
 */

export const removeUser = async (data: { id: number }) => {
    const { id } = data;

    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });
    if(!user) throw new Error("User not found.");

    await prisma.user.delete({
        where: {
            id
        }
    });

    return { message: "User successfully deleted." };
}