import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { ICourse } from './course.interface';
import { CourseService } from './course.service';
import { JwtPayload } from 'jsonwebtoken';

const createCourse = catchAsync(async (req: Request, res: Response) => {
    const host = req.user;
    const {userId} = host as JwtPayload

    const payload: ICourse = (req.body)

    const result = await CourseService.createCourse(userId, payload);
    console.log("result form controller", result);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Course created successfully',
        data: result,
    });
});


export const CourseController = {
    createCourse,
};
