const express = require('express');
const usuarioControlador = require('../controllers/usuario.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/registrarAlumno', usuarioControlador.RegistrarAlumno);
api.post('/registrarMaestro', usuarioControlador.RegistrarMaestro)
api.post('/login', usuarioControlador.Login)
api.put('/editarUsuario/:idUsuario', md_autenticacion.Auth, usuarioControlador.EditarUsuario)
api.delete('/eliminarAlumno/:idUsuario', md_autenticacion.Auth, usuarioControlador.EliminarAlumno)


module.exports = api;