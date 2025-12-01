import { Schema, model, Types } from "mongoose";
import { IQuizSubmission } from "./quiz.interface";

const quizSubmissionSchema = new Schema<IQuizSubmission>(
    {
        student: { type: Types.ObjectId, ref: "User", required: true },
        course: { type: Types.ObjectId, ref: "Course", required: true },
        lesson: { type: Types.ObjectId, ref: "Lesson", required: true },
        selectedOption: { type: Number, required: true },
        score: { type: Number, required: true }
    },
    { timestamps: true }
);

export const QuizSubmission = model<IQuizSubmission>(
    "QuizSubmission",
    quizSubmissionSchema
);
