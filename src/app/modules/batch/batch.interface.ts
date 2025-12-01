import { Types } from "mongoose";

export interface IBatch {
    _id?: string;
    name: string;
    startDate: Date;
    endDate: Date;
    currentStudents: number;
    enrolledCourses: Types.ObjectId[];
}
