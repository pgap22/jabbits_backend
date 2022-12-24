const express = require("express");
const {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
} = require("../controllers/TareaController");
const checkAuth = require("../middleware/checkAuth");
const checkObjectId = require("../middleware/checkObjectId");
const router = express.Router();

router.post("/", checkAuth, agregarTarea);
router
  .route("/:id")
  .get(checkAuth, checkObjectId, obtenerTarea)
  .put(checkAuth, checkObjectId, actualizarTarea)
  .delete(checkAuth, checkObjectId, eliminarTarea);
router.put("/tags/:id")
router.post("/estado/:id", checkAuth, checkObjectId, cambiarEstado);


module.exports = router;
