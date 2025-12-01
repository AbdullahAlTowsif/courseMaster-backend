import { Types } from "mongoose";

export interface ILesson {
    _id?: string;
    title: string;
    description: string;
    videoUrl: string;
    duration: number;
    order: number;
    isCompleted?: boolean;
    assignment: string;

    course: Types.ObjectId;
}
