/* eslint-disable @typescript-eslint/no-explicit-any */

import passport from "passport";
import { User } from "../modules/user/user.model";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        (email: string, password: string, done) => {
            User.findOne({ email })
                .then((isUserExist) => {
                    if (!isUserExist) return done("User doesn't Exist");

                    if (isUserExist.isDeleted) return done("User is Deleted");

                    return bcrypt
                        .compare(password, isUserExist.password)
                        .then((isPasswordMatched) => {
                            if (!isPasswordMatched) {
                                return done(null, false, { message: "Password doesn't Match" });
                            }

                            return done(null, isUserExist);
                        });
                })
                .catch((error) => done(error));
        }
    )
);


passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user._id);
});

passport.deserializeUser((id: string, done: any) => {
    try {
        const user = User.findById(id);
        done(null, user);
    } catch (error) {
        // console.log(error);
        done(error);
    }
});
