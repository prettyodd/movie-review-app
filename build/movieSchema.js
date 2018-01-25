'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReviewSchema = exports.MovieSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var MovieSchema = exports.MovieSchema = new Schema({
    id: {
        type: String,
        unique: true
    },
    title: {
        type: String
    },
    overview: {
        type: String
    },
    poster_path: {
        type: String
    },
    reviews: [{
        user: {
            type: String
        },
        review: {
            type: String
        }
    }]
});

var ReviewSchema = exports.ReviewSchema = new Schema({
    user: {
        type: String
    },
    review: {
        type: String
    }
});
//# sourceMappingURL=movieSchema.js.map