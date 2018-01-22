'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteUserReview = exports.addReview = exports.editReview = exports.loadSingleMovieData = exports.addNewMovieWithReview = exports.addNewUser = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _movieSchema = require('./movieSchema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Movie = _mongoose2.default.model('Movie', _movieSchema.MovieSchema);

var addNewUser = exports.addNewUser = function addNewUser(req, res) {
    var newUser = new User(req.body);

    newUser.save(function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
};

var addNewMovieWithReview = exports.addNewMovieWithReview = function addNewMovieWithReview(req, res) {
    var newMovie = new Movie(req.body);

    newMovie.save(function (err, movie) {
        if (err) {
            res.send(err);
        }
        res.json(movie);
    });
};

var loadSingleMovieData = exports.loadSingleMovieData = function loadSingleMovieData(req, res) {
    Movie.findOne({ id: req.params.id }, function (err, movie) {
        if (err) {
            res.send(err);
        }
        res.json(movie);
    });
};

var editReview = exports.editReview = function editReview(req, res) {
    Movie.findOneAndUpdate({ id: req.params.id, _id: req.params._id }, req.body, { new: true }, function (err, movie) {
        if (err) {
            res.send(err);
        }
        res.json(movie);
    });
};

var addReview = exports.addReview = function addReview(req, res) {
    Movie.findOneAndUpdate({ id: req.params.id }, { $push: req.body }, { safe: true, upsert: true, new: true }, function (err, movie) {
        if (err) {
            res.send(err);
        }
        console.log(req.params.id);
        res.json(movie);
    });
};

var deleteUserReview = exports.deleteUserReview = function deleteUserReview(req, res) {
    Movie.findOneAndUpdate({ id: req.params.id }, { $pull: { 'reviews': { user: req.params.user } } }, function (err, movie) {
        if (err) {
            res.send(err);
        }
        console.log(movie);
        res.json(movie);
    });
};
//# sourceMappingURL=userController.js.map