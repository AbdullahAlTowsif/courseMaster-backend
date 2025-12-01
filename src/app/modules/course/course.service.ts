import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { ICourse } from "./course.interface";
import { Course } from "./course.model";

const createCourse = async (userId: string, payload: Partial<ICourse>) => {
    console.log("payload from service", payload);
    if (!userId) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
    }

    const baseSlug = payload.title?.toLowerCase().split(" ").join("-")
    let slug = `${baseSlug}`

    let counter = 0
    while (await Course.exists({ slug })) {
        slug = `${slug}-${counter++}`
    }

    payload.slug = slug;

    const existingCourse = await Course.findOne({ host: userId, slug: payload.slug });

    if (existingCourse) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "You already have an course with this name"
        );
    }

    const course = await Course.create({
        host: userId,
        ...payload
    });

    return course;
};


export const CourseService = {
    createCourse
};
