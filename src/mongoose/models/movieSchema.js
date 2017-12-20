import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const MovieSchema = new Schema({
    title: {
        type: String
    },
    overview: {
        type: String
    },
    review: {
        type: String
    },
    _id: {
        type: String,
        unique: true
    }
});
