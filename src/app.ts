import express, { Request, Response } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import { envVars } from "./app/config/env";
import "./app/config/passport";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorhandlers";
import notFound from "./app/middlewares/notFound";

const app = express();

app.use(
    cors({
        origin: envVars.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    })
);

app.use(expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }))

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Course Master Server is running!"
    })
})

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);


export default app;