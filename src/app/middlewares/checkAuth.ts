import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/AppError";
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";
import httpStatus from "http-status-codes";
import { verifyToken } from "../utils/jwt";

export const checkAuth =
    (...authRoles: string[]) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const accessToken = req.headers.authorization || req.cookies.accessToken;

                if (!accessToken) {
                    throw new AppError(403, "No Token Recieved");
                }
                const verfiedToken = verifyToken(
                    accessToken,
                    envVars.JWT_ACCESS_SECRET
                ) as JwtPayload;

                const isUserExist = await User.findOne({ email: verfiedToken.email });

                if (!isUserExist) {
                    throw new AppError(httpStatus.BAD_REQUEST, "User does not Exists");
                }


                if (isUserExist.isDeleted) {
                    throw new AppError(httpStatus.BAD_REQUEST, "User is Deleted");
                }

                if (!authRoles.includes(verfiedToken.role)) {
                    throw new AppError(403, "You are not permitted to view this route");
                }

                req.user = verfiedToken;
                next();
            } catch (error) {
                console.log("jwt error", error);
                next(error);
            }
        };
