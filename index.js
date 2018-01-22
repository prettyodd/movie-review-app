import express from 'express';
import bodyParser from 'body-parser';
import Routes from './src/mongoose/routes/';
import cors from 'cors';

const app = express();
const PORT = 3000;

// bodyparser setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes with ejs
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('home', {
      content: 'ejs render from server'
    });
});

// api routes with mongoose
app.use('/api', Routes);
app.use(express.static('public'));

// Serve gzipped file in production
app.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);