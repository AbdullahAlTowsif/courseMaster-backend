import { model, Schema, Types } from "mongoose";
import { ILesson } from "./lesson.interface";

const lessonSchema = new Schema<ILesson>({
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String, required: true },
    duration: { type: Number, default: 0 },
    order: { type: Number, required: true },
    isCompleted: { type: Boolean, default: false },
    assignment: {type: String},

    course: { type: Types.ObjectId, ref: "Course", required: true },
});

export const Lesson = model<ILesson>("Lesson", lessonSchema);
