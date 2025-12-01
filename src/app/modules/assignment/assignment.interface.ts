import { Types } from "mongoose";

export interface IAssignmentSubmission {
    _id?: string;
    student: Types.ObjectId;
    course: Types.ObjectId;
    lesson: Types.ObjectId;
    answerUrl: string;
    reviewedBy?: Types.ObjectId;
    feedback?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
