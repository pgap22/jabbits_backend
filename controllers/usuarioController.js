const generarId = require("../helpers/generarId");
const Usuario = require("../models/Usuario");
const generarJWT = require("../helpers/generarJWT");
const { emailRegistro, emailPassword } = require("../helpers/email");
const registrar = async (req, res) => {
  const usuarioNuevo = new Usuario(req.body);
  const { email, nombre, password } = req.body;

  if (!email || !nombre || !password) {
    return res.status(400).json({
      status: "error",
      msg: "Campos Vacios !",
    });
  }

  const mismoEmail = await Usuario.findOne({ email });

  if (mismoEmail) {
    return res.status(400).json({
      status: "error",
      msg: "Mismo Email",
      field: 'email'
    });
  }

  try {
    usuarioNuevo.token = generarId();
    await usuarioNuevo.save();

    emailRegistro(usuarioNuevo);

    res.status(200).json({
      status: "success",
      msg: "Usuario creado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      msg: "No se pudo crear la cuenta",
    });
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });
  
  if (!usuario) {
    return res.status(404).json({
      status: "error",
      msg: "El Usuario no existe",
    });
  }

  const contraseñaEsCorrecta = await usuario.comprobarPassword(password);



  if (!usuario.confirmado & contraseñaEsCorrecta) {
    return res.status(403).json({
      status: "error",
      msg: "El Usuario no esta verificado",
    });
  }

  if (contraseñaEsCorrecta & usuario.confirmado) {
    return res.status(200).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    return res.status(400).json({
      status: "error",
      msg: "Password incorrecto",
    });
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuario = await Usuario.findOne({ token });

  if (!usuario || usuario.confirmado) {
    return res.status(404).json({
      status: "error",
      msg: "El Token no es valido",
    });
  }

  try {
    usuario.confirmado = true;
    usuario.token = "";
    await usuario.save();
    res.status(200).json({
      status: "success",
      msg: "Usuario Confirmado Correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    return res.status(404).json({
      status: "error",
      msg: "El Usuario no existe",
    });
  }

  try {
    usuario.token = generarId();
    await usuario.save();
    emailPassword({
      email: usuario.email,
      token: usuario.token,
      nombre: usuario.nombre,
    })
    res.status(200).json({
      status: "success",
      msg: "Instrucciones enviado al correo !",
    });
  } catch (error) {
    console.log(error);
  }
};

const cambiarPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  const usuario = await Usuario.findOne({ token });

  if (!usuario) {
    return res.status(404).json({
      status: "error",
      msg: "Token no valido",
    });
  }

  if (!password) {
    return res.status(404).json({
      status: "error",
      msg: "Password vacio",
    });
  }

  try {
    usuario.password = password;
    usuario.token = "";
    await usuario.save();
    res.status(200).json({
      status: "success",
      msg: "El password se ha cambiado",
    });
  } catch (error) {
    console.log(error);
  }
};

const validarToken = async (req, res) => {
  const { token } = req.params;
  const usuario = await Usuario.findOne({ token });

  if (!usuario || !usuario.confirmado) {
    return res.status(404).json({
      status: "error",
      msg: "Token no valido",
    });
  }

  res.status(200).json({
    status: "success",
    msg: "Token valido",
  });
};

const verPerfil = async (req, res) => {
  const {usuario} = req;
  if(!usuario) {
    return res.status(404).json({});
  }
  res.status(200).json(usuario);
};

module.exports = {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  cambiarPassword,
  validarToken,
  verPerfil,
};
