import mongoose from 'mongoose';
import { UserSchema } from '../models/userSchema';
import { MovieSchema, ReviewSchema } from '../models/movieSchema';

const User = mongoose.model('User', UserSchema);
const Movie = mongoose.model('Movie', MovieSchema);
const Review = mongoose.model('Review', ReviewSchema)

export const addNewUser = (req, res) => {
    let newUser = new User(req.body);

    newUser.save((err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
};

export const addNewMovieWithReview = (req, res) => {
    let newMovie = new Movie(req.body)

    newMovie.save((err, movie) => {
        if (err) {
            res.send(err)
        }
        res.json(movie)
    })
}

export const loadSingleMovieData = (req, res) => {
    Movie.findOne({id: req.params.id}, (err, movie) => {
        if (err) {
            res.send(err);
        }
        res.json(movie);
    });
}

export const editReview = (req, res) => {
    Movie.findOneAndUpdate({ id: req.params.id, _id: req.params._id }, req.body, { new: true }, (err, movie) => {
        if (err) {
            res.send(err);
        }
        res.json(movie);
    })
}

export const addReview = (req, res) => {
    Movie.findOneAndUpdate(
        {id: req.params.id},
        {$push: req.body},
        {safe: true, upsert: true, new: true},
        (err, movie) => {
            if (err) {
                res.send(err)
            }
            console.log(req.params.id)
            res.json(movie)
        }
    )
}

export const deleteUserReview = (req, res) => {
    Movie.findOneAndUpdate(
        {id: req.params.id},
        {$pull: {'reviews': {user: req.params.user}}},
        (err, movie) => {
            if (err) {
                res.send(err)
            }
            console.log(movie)
            res.json(movie)
        }
    )
}