'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userController = require('./userController.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// mongoose setuo
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://localhost/CRMdb', {
    //mongoose.connect('mongodb://mong:27017/miniIMDB', {
    useMongoClient: true
});

var Routes = _express2.default.Router();

// home route
Routes.get('/', function (req, res) {
    res.send('home. api data render with mongoose');
});
Routes.post('/', _userController.addNewUser);

// /movie route
Routes.get('/movie', function (req, res) {
    res.send('movie. api data render with mongoose');
});

Routes.get('/movie/:id', _userController.loadSingleMovieData);
Routes.post('/movie/:id', _userController.addNewMovieWithReview);
Routes.post('/movie/:id/reviews', _userController.addReview);
Routes.post('/movie/:id/delete-user-review/:user', _userController.deleteUserReview);

exports.default = Routes;
//# sourceMappingURL=mongoose.js.map