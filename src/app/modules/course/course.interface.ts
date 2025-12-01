import { Types } from "mongoose";

export interface ICourse {
  _id?: string;
  title: string;
  slug?: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  instructor: Types.ObjectId; // reference to User (admin/instructor)
  thumbnail?: string;
  syllabus?: string[]; // short bullets
  lessons?: Types.ObjectId[]; // references to Lesson documents
  batches?: Types.ObjectId[]; // references to Batch documents
  studentsCount?: number;
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
