const express = require('express');
const asignacionControlador = require('../controllers/asignacion.controller');

const api = express.Router();

api.post('/agregarAsignacion', asignacionControlador.AgregarAsignacion);

module.exports = api;