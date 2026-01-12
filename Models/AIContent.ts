import mongoose, { Schema, model, models } from "mongoose";

const AIContentSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        originalText: {
            type: String,
            required: true,
        },
        style: {
            type: String,
            enum: ["whiteboard", "viral"],
            default: "whiteboard",
        },
        script: {
            type: Array, // Stores the JSON array of scenes
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const AIContent = models.AIContent || model("AIContent", AIContentSchema);

export default AIContent;
