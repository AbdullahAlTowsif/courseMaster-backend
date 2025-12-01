import { Schema, model, Types } from "mongoose";
import { ICourse } from "./course.interface";

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
    category: { type: String, index: true },
    tags: [{ type: String, index: true }],
    instructor: { type: Types.ObjectId, ref: "User", required: true }, // Maintains: course belongs to admin/instructor
    thumbnail: { type: String },
    syllabus: [{ type: String }],
    // Strong relationship links:
    lessons: [{ type: Types.ObjectId, ref: "Lesson" }], // Each course has many lessons
    batches: [{ type: Types.ObjectId, ref: "Batch" }],  // Course -> many batches
    studentsCount: { type: Number, default: 0 },
    published: { type: Boolean, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


export const Course = model<ICourse>("Course", courseSchema);

