import { Schema } from "mongoose";

export const HouseSchema = new Schema({
    bedrooms: {
        type: Number,
        max: 50,
        required: true
    },
    bathrooms: {
        type: Number,
        max: 50,
        required: true
    },
    year: {
        type: Number,
        min: 1900,
        max: 2025,
        required: true
    },
    price: {
        type: Number,
        max: 2000000,
        required: true
    },
    imgUrl: {
        type: String,
        maxlength: 1000,
        required: true,
        default: '//placehold.it/300x300'
    },
    description: {
        type: String,
        minlength: 3,
        maxlength: 500,
    },
    creatorId: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })