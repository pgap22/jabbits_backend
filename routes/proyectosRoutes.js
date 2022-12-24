const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const {
  obtenerProyectos,
  obtenerProyecto,
  nuevoProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
  buscarColaborador,
  enviarInvitacion,
  aceptarInvitacion,
} = require("../controllers/ProyectoController");
const checkObjectId = require("../middleware/checkObjectId");

const route = express.Router();

route
.route("/")
.get(checkAuth, obtenerProyectos)
.post(checkAuth, nuevoProyecto);

route.post("/enviar-invitacion/:id", checkAuth, checkObjectId,enviarInvitacion);
route.get("/aceptar-invitacion/:id", checkAuth, checkObjectId,aceptarInvitacion);

route.post("/colaborador/", checkAuth, buscarColaborador);
route.post("/colaborador/:id", checkAuth,checkObjectId, agregarColaborador);
route.delete("/eliminar-colaborador/:id", checkAuth, checkObjectId,eliminarColaborador);

route
  .route("/:id")
  .get(checkAuth,checkObjectId, obtenerProyecto)
  .put(checkAuth,checkObjectId, editarProyecto)
  .delete(checkAuth, checkObjectId,eliminarProyecto);


module.exports = route;
