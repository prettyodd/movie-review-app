import express from 'express';
import mongoose from 'mongoose';
import { 
    addNewUser,
    addNewMovie
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

Routes.get('/movie/:id', (req, res) => {
    res.send('movie/:id. api data render with mongoose')
})
Routes.post('/movie/:id', addNewMovie)

export default Routes;
