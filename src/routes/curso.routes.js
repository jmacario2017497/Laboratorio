const express = require('express');
const cursoControlador = require('../controllers/curso.controller');
const md_autenticacion = require('../middlewares/autenticacion')
const api = express.Router();
api.post('/agregarCurso', md_autenticacion.Auth,cursoControlador.AgregarCurso);
api.put('/editarCurso/:idCurso', md_autenticacion.Auth, cursoControlador.EditarCurso)
api.get('/obtenerCursosMaestro', md_autenticacion.Auth, cursoControlador.VerCursos);


module.exports = api;