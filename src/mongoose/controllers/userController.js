import mongoose from 'mongoose';
import { UserSchema } from '../models/userSchema';
import { MovieSchema } from '../models/movieSchema';

const User = mongoose.model('User', UserSchema);
const Movie = mongoose.model('Movie', MovieSchema);

export const addNewUser = (req, res) => {
    let newUser = new User(req.body);

    newUser.save((err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
};

export const addNewMovie = (req, res) => {
    let newMovie = new Movie(req.body)

    newMovie.save((err, movie) => {
        if (err) {
            res.send(err)
        }
        res.json(movie)
    })
}