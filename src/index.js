const express = require('express');
const  morgan = require('morgan');
const  exphbs = require('express-handlebars');

const path = require('path');
const app=express();

//Asigno puerto
app.set('port',process.env.PORT || 8000);

// ruta de vista
app.set('views',path.join(__dirname,'views'));

app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine','.hbs');

//Peticones

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//variables globales
app.use((req,res,next)=>{
    next();
});
//rutas

app.use('/productos', require('./routes/productos'));
app.use('/admin', require('./routes/admin/index'));
app.use('/usuarios', require('./routes/usuarios'));
 
//public
app.use(express.static(path.join(__dirname, 'public')));




// inicia servidor
app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});