import { model, Schema } from "mongoose";
import { IBatch } from "./batch.interface";

const batchSchema = new Schema<IBatch>({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    currentStudents: { type: Number, default: 0 },
    enrolledCourses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

export const Batch = model<IBatch>("Batch", batchSchema)