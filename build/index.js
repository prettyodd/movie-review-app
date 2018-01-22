'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('./mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = 3000;

// bodyparser setup
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// routes with ejs
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('home', {
        content: 'ejs render from server'
    });
});

// api routes with mongoose
app.use('/api', _mongoose2.default);
app.use(_express2.default.static('public'));

// Serve gzipped file in production
app.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

app.listen(PORT, function () {
    return console.log('your server is running on port ' + PORT);
});
//# sourceMappingURL=index.js.map