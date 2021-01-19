const express = require('express');
const Handlebars = require('handlebars');
const expresshandlebars = require('express-handlebars');
const expsession = require('express-session');
const expressvalidator = require('express-validator');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const passportlocal = require('passport-local');
const path = require('path');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

//inicializaciones
const app = express();

//configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('public', path.join(__dirname, 'public'));
app.engine('.hbs', expresshandlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', '.hbs');

//middlewars
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//variables globales
app.use((req, res, next) => {
    next();
});

//rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/users/', require('./routes/users'));

//publicos
app.use(express.static(app.get('public')));

module.exports = app;