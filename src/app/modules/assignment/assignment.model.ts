import { Schema, model, Types } from "mongoose";
import { IAssignmentSubmission } from "./assignment.interface";

const assignmentSchema = new Schema<IAssignmentSubmission>(
    {
        student: { type: Types.ObjectId, ref: "User", required: true },
        course: { type: Types.ObjectId, ref: "Course", required: true },
        lesson: { type: Types.ObjectId, ref: "Lesson", required: true },
        answerUrl: { type: String, required: true },
        reviewedBy: { type: Types.ObjectId, ref: "User" },
        feedback: String
    },
    { timestamps: true }
);

export const AssignmentSubmission = model<IAssignmentSubmission>(
    "AssignmentSubmission",
    assignmentSchema
);
