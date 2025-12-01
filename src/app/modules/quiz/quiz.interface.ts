import { Types } from "mongoose";

export interface IQuizSubmission {
    _id?: string;
    student: Types.ObjectId;
    course: Types.ObjectId;
    lesson: Types.ObjectId;
    selectedOption: number;
    score: number;
    createdAt?: Date;
    updatedAt?: Date;
}
