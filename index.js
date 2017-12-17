import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Routes from './src/mongoose/routes/';

const app = express();
const PORT = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useMongoClient: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes with ejs
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('home', {
      content: 'Hello from ejs'
    });
});

// api routes
app.use('/api', Routes);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);