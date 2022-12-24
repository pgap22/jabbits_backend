const express = require("express");
const { registrar, autenticar,confirmar,olvidePassword,cambiarPassword, validarToken, verPerfil} = require("../controllers/usuarioController");
const checkAuth = require('../middleware/checkAuth')
const router = express.Router();

router.post("/registrar", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
router.put("/olvide-password/:token", cambiarPassword).get("/olvide-password/:token", validarToken);

router.get("/perfil", checkAuth, verPerfil);

module.exports = router;
