import { Schema } from "mongoose";

export const JobSchema = new Schema({
    title: {
        type: String,
        maxlength: 100,
        required: true
    },
    wage: {
        type: Number,
        max: 1000000,
        required: true
    },
    salary: {
        type: Boolean,
        required: true,
        default: false
    },
    description: {
        type: String,
        minlength: 10,
        maxlength: 1000,
    },
    creatorId: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })