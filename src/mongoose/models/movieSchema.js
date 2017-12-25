import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const MovieSchema = new Schema({
    id: {
        type: String
    },
    title: {
        type: String
    },
    overview: {
        type: String
    },
    reviews: [{
        user: {
            type: String,
            unique: true
        },
        review: {
            type: String
        }
    }],
});

export const ReviewSchema = new Schema({
    user: {
        type: String
    },
    review: {
        type: String
    }
})