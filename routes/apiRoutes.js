const express = require('express');
const { enviarDatosContacto } = require('../controllers/apiController');
const routes = express.Router();

routes.post("/contacto",enviarDatosContacto)

module.exports = routes;