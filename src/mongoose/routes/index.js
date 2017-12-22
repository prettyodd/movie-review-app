import express from 'express';
import mongoose from 'mongoose';
import { 
    addNewUser,
    addNewMovieWithReview,
    loadSingleMovieData,
    editReview,
    addReview
} from '../controllers/userController';

// mongoose setuo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useMongoClient: true
});

const Routes = express.Router();

// home route
Routes.get('/', (req, res) => {
    res.send(`home. api data render with mongoose`)
});
Routes.post('/', addNewUser);

// /movie route
Routes.get('/movie', (req, res) => {
    res.send('movie. api data render with mongoose')
});

Routes.get('/movie/:id', loadSingleMovieData)
Routes.post('/movie/:id', addNewMovieWithReview)
Routes.post('/movie/:id/reviews', addReview)

export default Routes;
