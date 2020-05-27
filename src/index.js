const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MYSQLStore = require('express-mysql-session');
const passport = require('passport');
const fileUpload = require('express-fileupload')

const {
    database
} = require('./keys');

//Inicializaciones



const app = express();
require('./lib/passport');

app.use(fileUpload());

//Asigno puerto
app.set('port', process.env.PORT || 8000);

// ruta de vista
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine', '.hbs');

//Peticones ó Middlewares
app.use(session({
    secret: 'karladiaz21',
    resave: false,
    saveUninitialized: false,
    store: new MYSQLStore(database)
}));
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});
//rutas

//Rutas Administrador
app.use('/admin', require('./routes/admin/index'));
app.use('/admin/categorias', require('./routes/admin/categorias'));
app.use('/admin/productos', require('./routes/admin/productos'));
app.use('/admin/reportes', require('./routes/admin/reportes'));
app.use('/admin/solicitudes', require('./routes/admin/solicitudes'));


//Rutas Usuarios generales
app.use('/productos', require('./routes/productos'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/home', require('./routes/home'));

//public
app.use(express.static(path.join(__dirname, 'public')));




// inicia servidor
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});