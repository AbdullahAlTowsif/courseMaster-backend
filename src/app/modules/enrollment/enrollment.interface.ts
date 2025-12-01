import { Types } from "mongoose";

export interface IEnrollment {
    _id?: string;
    student: Types.ObjectId;
    course: Types.ObjectId;
    batch: Types.ObjectId;
    progress: number;
    completedLessons: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}
