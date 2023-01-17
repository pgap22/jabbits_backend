const express = require("express");

const routes = express.Router();

const {
  crearTarea,
  leerTareas,
  eliminarTarea,
  editarTarea,
} = require("../controllers/tareaIndivualController");

const checkAuth = require('../middleware/checkAuth');
const checkObjectId = require('../middleware/checkObjectId');

//mipagina.com/api/tarea-individual
//CRUD API REST
// POST (Crear),  GET (Leer), PUT (Editar) o PATCH (Editar subrecursos), DELETE

//mipagina.com/api/tarea-indivual (GET)
//mipagina.com/api/tarea-indivual (POST) Crear
//mipagina.com/api/tarea-indivual/:id (DELETE) Delete
//mipagina.com/api/tarea-indivual/:id (PUT) Editar

routes.get("/",checkAuth,leerTareas);
routes.post("/",checkAuth,crearTarea);
routes.put("/:id",checkAuth,checkObjectId,editarTarea);
routes.delete("/:id",checkAuth,checkObjectId,eliminarTarea);

module.exports = routes;
