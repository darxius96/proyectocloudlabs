const express = require('express');
const Handlebars = require('handlebars');
const expresshandlebars = require('express-handlebars');
const expsession = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const flash = require('connect-flash');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const MongoDBStore = require('connect-mongodb-session')(expsession);

//inicializaciones
const app = express();
const store = new MongoDBStore({
    uri: process.env.URLMONGO ? process.env.URLMONGO : 'mongodb+srv://cloudlabs:aeWV5d853NnNPK2B@cluster0.waobj.mongodb.net/db_cloudlabs?retryWrites=true&w=majority',
    collection: 'sessions'
});
require('../src/lib/passport');

// verificar errores
store.on('error', function(error) {
    console.log(error);
});

//configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', expresshandlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', '.hbs');

//middlewars
app.use(expsession({
    secret: 'cloudlabs',
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.use(flash());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

//variables globales
app.use((req, res, next) => {
    app.locals.notifications = req.flash('notifications');
    app.locals.user = req.user;
    next();
});

//rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/users/', require('./routes/users'));

module.exports = app;