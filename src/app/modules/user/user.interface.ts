import { Types } from "mongoose";

export enum Role {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT",
    INSTRUCTOR = "INSTRUCTOR"
}

export interface IUser {
    _id: Types.ObjectId
    name: string;
    email: string;
    password: string;
    phone?: string;
    picture?: string;
    address?: string;
    isDeleted?: string;

    role: Role;
    enrolledCourses?: Types.ObjectId[];
    createdAt?: Date
    updatedAt?: Date
}
