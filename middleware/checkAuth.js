const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const checkAuth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const jwtToken = req.headers.authorization.split(" ")[1];
      token = jwt.verify(jwtToken, process.env.JWT_SECRET);
      req.usuario = await Usuario.findById(token.id).select(
        "-password -confirmado -token -createdAt -updatedAt -__v"
      );
      if (req.usuario) return next();
    } catch (error) {
      return res.status(404).json({
        status: "error",
        msg: "hubo un error",
      });
    }
  }

  return res.status(400).json({
    status: "error",
    msg: "Token no valido",
  });
};

module.exports = checkAuth;
