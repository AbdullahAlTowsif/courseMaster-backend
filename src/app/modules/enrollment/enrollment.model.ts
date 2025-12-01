import { Schema, model, Types } from "mongoose";
import { IEnrollment } from "./enrollment.interface";

const enrollmentSchema = new Schema<IEnrollment>(
  {
    student: { type: Types.ObjectId, ref: "User", required: true },
    course: { type: Types.ObjectId, ref: "Course", required: true },
    batch: { type: Types.ObjectId, ref: "Batch", default: null },
    completedLessons: [{ type: Types.ObjectId, ref: "Lesson" }],
    progress: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Enrollment = model<IEnrollment>("Enrollment", enrollmentSchema);
