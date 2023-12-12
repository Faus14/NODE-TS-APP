import express from 'express';
import path from 'path';

import exphbs from 'express-handlebars';

import methodOverride from 'method-override';

// Routes
import IndexRoutes from './routes';
import BooksRoutes from './routes/books';

// Initializations
const app = express();
require('./database');

// settings
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

// Configuración de Express Handlebars
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    helpers: require('./lib/helpers')
}));
app.set('view engine', '.hbs');

// Middleware para manejar datos en formato JSON
app.use(express.json());

// Middleware para manejar datos en formularios HTML
app.use(express.urlencoded({ extended: false }));

// Rutas de tu aplicación
// ...

// Arranque del servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride());

// Routes
app.use(IndexRoutes);
app.use('/books', BooksRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Starting the Server
app.listen(app.get('port'), () => {
    console.log(`Server on port`, app.get('port'));
});