const express = require('express');
const cors = require('cors');
var app = express();

const RoutesAsignacion = require('./src/routes/asignacion.routes')
const RoutesUsuario = require('./src/routes/usuario.routes')
const RoutesCurso = require('./src/routes/curso.routes')

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors());

app.use('/api', RoutesUsuario, RoutesAsignacion, RoutesCurso)

module.exports = app;