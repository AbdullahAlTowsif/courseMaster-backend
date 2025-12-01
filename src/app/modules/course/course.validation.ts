import { z } from 'zod';
import mongoose from 'mongoose';

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (value: string): boolean => {
    return mongoose.Types.ObjectId.isValid(value);
};

// Reusable schemas
export const objectIdSchema = z.string().refine(
    (val) => isValidObjectId(val),
    { message: 'Invalid MongoDB ObjectId' }
);

// File validation for thumbnail (URL or base64)
const thumbnailSchema = z.string()
    .optional()
    .refine(
        (val) => {
            if (!val) return true; // Optional
            // Check if it's a valid URL
            try {
                new URL(val);
                return true;
            } catch {
                // Check if it's a base64 string
                return val.startsWith('data:image/');
            }
        },
        { message: 'Thumbnail must be a valid URL or base64 image string' }
    );

// Create Course Schema
export const createCourseSchema = z.object({
    body: z.object({
        title: z.string('Title is required')
            .min(3, 'Title must be at least 3 characters')
            .max(200, 'Title cannot exceed 200 characters')
            .trim(),

        description: z.string('Description is required')
            .min(10, 'Description must be at least 10 characters')
            .max(5000, 'Description cannot exceed 5000 characters')
            .trim(),

        price: z.number("Price must be a number")
            .min(0, 'Price cannot be negative')
            .default(0),

        tags: z.array(
            z.string()
                .min(1, 'Tag cannot be empty')
                .max(50, 'Tag cannot exceed 50 characters')
                .trim()
        )
            .max(20, 'Cannot have more than 20 tags')
            .optional()
            .default([]),

        instructor: objectIdSchema
            .optional()
            .refine(
                (val) => !val || isValidObjectId(val),
                { message: 'Invalid instructor ID' }
            ),

        host: objectIdSchema
            .optional()
            .refine(
                (val) => !val || isValidObjectId(val),
                { message: 'Invalid host ID' }
            ),

        thumbnail: thumbnailSchema,

        syllabus: z.array(
            z.string()
                .min(1, 'Syllabus item cannot be empty')
                .max(500, 'Syllabus item cannot exceed 500 characters')
                .trim()
        )
            .max(50, 'Cannot have more than 50 syllabus items')
            .optional()
            .default([]),

        lessons: z.array(objectIdSchema)
            .optional()
            .default([]),

        batches: z.array(objectIdSchema)
            .optional()
            .default([]),

        studentsCount: z.number()
            .int('Students count must be an integer')
            .min(0, 'Students count cannot be negative')
            .optional()
            .default(0),

        published: z.boolean()
            .optional()
            .default(false),
    })
        .refine(
            (data) => {
                // Custom validation: If host is provided, it must be a valid ObjectId
                if (data.host && !isValidObjectId(data.host)) {
                    return false;
                }
                return true;
            },
            { message: 'Invalid host ID format', path: ['host'] }
        ),
});

// Update Course Schema (partial updates allowed)
export const updateCourseSchema = z.object({
    params: z.object({
        id: objectIdSchema,
    }),

    body: z.object({
        title: z.string()
            .min(3, 'Title must be at least 3 characters')
            .max(200, 'Title cannot exceed 200 characters')
            .trim()
            .optional(),

        description: z.string()
            .min(10, 'Description must be at least 10 characters')
            .max(5000, 'Description cannot exceed 5000 characters')
            .trim()
            .optional(),

        price: z.number()
            .min(0, 'Price cannot be negative')
            .max(10000, 'Price cannot exceed $10,000')
            .optional(),

        category: z.string()
            .min(1, 'Category is required')
            .max(100, 'Category cannot exceed 100 characters')
            .trim()
            .optional(),

        tags: z.array(
            z.string()
                .min(1, 'Tag cannot be empty')
                .max(50, 'Tag cannot exceed 50 characters')
                .trim()
        )
            .max(20, 'Cannot have more than 20 tags')
            .optional(),

        instructor: objectIdSchema
            .optional()
            .refine(
                (val) => !val || isValidObjectId(val),
                { message: 'Invalid instructor ID' }
            ),

        host: objectIdSchema
            .optional()
            .refine(
                (val) => !val || isValidObjectId(val),
                { message: 'Invalid host ID' }
            ),

        thumbnail: thumbnailSchema,

        syllabus: z.array(
            z.string()
                .min(1, 'Syllabus item cannot be empty')
                .max(500, 'Syllabus item cannot exceed 500 characters')
                .trim()
        )
            .max(50, 'Cannot have more than 50 syllabus items')
            .optional(),

        lessons: z.array(objectIdSchema)
            .optional(),

        batches: z.array(objectIdSchema)
            .optional(),

        studentsCount: z.number()
            .int('Students count must be an integer')
            .min(0, 'Students count cannot be negative')
            .optional(),

        published: z.boolean()
            .optional(),
    })
        .refine(
            (data) => {
                // At least one field should be provided for update
                return Object.keys(data).length > 0;
            },
            { message: 'At least one field must be provided for update' }
        )
        .refine(
            (data) => {
                // If host is provided, validate it
                if (data.host && !isValidObjectId(data.host)) {
                    return false;
                }
                return true;
            },
            { message: 'Invalid host ID format', path: ['host'] }
        ),
});

export const courseValidation = {
    createCourseSchema,
    updateCourseSchema
};