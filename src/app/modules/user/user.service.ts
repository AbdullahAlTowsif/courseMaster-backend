import bcrypt from "bcrypt";
import httpStatus from 'http-status-codes';
import { User } from "./user.model";
import { IUser } from "./user.interface";
import AppError from "../../errorHelpers/AppError";
import { envVars } from "../../config/env";

const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    // Validate required fields
    if (!email || !password) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email and password are required");
    }

    const isUserExist = await User.findOne({ email })

    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist")
    }

    const hashedPassword = await bcrypt.hash(password, Number(envVars.BCRYPT_SALT_ROUND))

    const user = await User.create({
        email,
        password: hashedPassword,
        ...rest
    })

    return user
}

export const UserServices = {
    createUser
}
