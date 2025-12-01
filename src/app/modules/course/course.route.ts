import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { CourseController } from "./course.controller";
import { createCourseSchema } from "./course.validation";


const router = express.Router();

router.post(
    "/create-course",
    checkAuth(Role.ADMIN),
    validateRequest(createCourseSchema),
    CourseController.createCourse
);


export const CourseRoutes = router