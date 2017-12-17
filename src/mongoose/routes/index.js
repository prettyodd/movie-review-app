import express from 'express';
import mongoose from 'mongoose';
import { 
    addNewUser
} from '../controllers/userController';

// mongoose setuo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useMongoClient: true
});

const Routes = express.Router();

Routes.get('/', (req, res) => {
    res.send(`Node and express server is running`)
});

Routes.post('/', addNewUser);

export default Routes;
