const { default: mongoose } = require("mongoose");
const { emailInvitacion } = require("../helpers/email");
const Proyecto = require("../models/Proyecto");
const Usuario = require("../models/Usuario");

const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body);

  proyecto.creador = req.usuario.id;

  try {
    await proyecto.save();
    return res.status(200).json(proyecto);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      msg: "Hubo un error",
    });
  }
};
const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find({
    $or: [
      { creador: req.usuario.id },
      { colaboradores: { $in: [mongoose.Types.ObjectId(req.usuario.id)] } },
    ],
  }).select("-tareas");

  if (!proyectos) {
    return res.status(404).json({
      status: "error",
      msg: "No se encontro ningun proyecto asociado a esta cuenta",
    });
  }

  return res.status(200).json(proyectos);
};

const obtenerProyecto = async (req, res) => {
  const proyectos = await Proyecto.findById(req.params.id)  
    .or([
      { creador: req.usuario.id },
      { colaboradores: { $in: [mongoose.Types.ObjectId(req.usuario.id)] } },
    ])
    .populate({
      path: "tareas",
      populate: {
        path: 'creadorPor',
        select: '-token -__v -id -confirmado -createdAt -updatedAt -password -invitaciones '
      }
    });

  if (!proyectos) {
    return res.status(404).json({
      status: "error",
      msg: "No se encontro ningun proyecto asociado a esta cuenta",
    });
  }

  return res.status(200).json({
    proyectos,
  });
};

const editarProyecto = async (req, res) => {
  const { id } = req.params;
  const proyecto = await Proyecto.findByIdAndUpdate(id, req.body, { new: true })
    .where("creador")
    .equals(req.usuario.id);

  if (!proyecto) {
    return res.status(400).json({
      staus: "error",
      msg: "Hubo un error",
    });
  }

  return res.status(200).json(proyecto);
};
const eliminarProyecto = async (req, res) => {
  const { id } = req.params;
  const proyecto = await Proyecto.findByIdAndDelete(id, { new: true })
    .where("creador")
    .equals(req.usuario.id);

  if (!proyecto) {
    return res.status(400).json({
      staus: "error",
      msg: "Hubo un error",
    });
  }

  return res.status(200).json({
    status: "success",
    msg: "Proyecto Eliminado!",
  });
};
const buscarColaborador = async (req, res) => {
  try {
    const { email } = req.body;

    if (email == req.usuario.email) {
      return res.status(400).json({
        msg: "No te puedes agregar a ti mismo",
      });
    }

    if (!email) {
      return res.status(400).json({
        msg: "Debes colocar un email",
      });
    }

    const usuario = await Usuario.findOne({ email }).select(
      "-_id -createdAt -updatedAt -token -confirmado -password -__v -invitaciones"
    );

    if (!usuario)
      return res.status(404).json({
        msg: "No se encontro ese usuario",
      });

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const enviarInvitacion = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  if (!email) {
    return res.status(400).json({
      msg: "Debes colocar un email",
    });
  }

  if (email == req.usuario.email) {
    return res.status(400).json({
      msg: "No puedes enviar la invitacion a ti mismo",
    });
  }

  try {
    const usuario = await Usuario.findOne({ email }).select(
      "-createdAt -updatedAt -token -confirmado -password -__v"
    );

    if (!usuario)
      return res.status(404).json({
        msg: "No se encontro ese usuario",
      });

    const proyecto = await Proyecto.findById(id)
      .where("creador")
      .equals(req.usuario.id);

    if (!proyecto)
      return res.status(403).json({
        msg: "El Proyecto no se a encontrado o no tienes los permisos",
      });

    if (usuario.invitaciones.includes(proyecto._id)) {
      return res.status(400).json({
        msg: "El Usuario ya recibio una invitacion",
      });
    }

    // console.log(proyecto.colaboradores.includes(usuario._id));

    emailInvitacion(
      usuario.nombre,
      usuario.email,
      proyecto._id.toString(),
      proyecto.nombre
    );

    usuario.invitaciones.push(proyecto._id);
    usuario.save();
    return res.status(200).json({
      msg: "Invitacion Enviada",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "hubo un error",
    });
  }
};
const aceptarInvitacion = async (req, res) => {
  const { email } = req.usuario;
  const { id } = req.params;

  if (!email) {
    return res.status(400).json({
      msg: "Debes colocar un email",
    });
  }

  try {
    const usuario = await Usuario.findOne({ email }).select(
      "-createdAt -updatedAt -token -confirmado -password -__v"
    );

    if (!usuario)
      return res.status(404).json({
        msg: "No se encontro ese usuario",
      });

    const proyecto = await Proyecto.findById(id);

    if (!proyecto)
      return res.status(403).json({
        msg: "El Proyecto no se a encontrado",
      });

    if (!usuario.invitaciones.includes(proyecto._id)) {
      return res.status(400).json({
        msg: "Invitacion invalida",
      });
    }

    proyecto.colaboradores.push(usuario._id);
    proyecto.save();

    usuario.invitaciones.pull(proyecto._id);
    usuario.save();

    return res.status(200).json({
      msg: "Invitacion Aceptada",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "hubo un error",
    });
  }
};

const agregarColaborador = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  if (!email) {
    return res.status(400).json({
      msg: "Debes colocar un email",
    });
  }

  if (email == req.usuario.email) {
    return res.status(400).json({
      msg: "No te puedes agregar a ti mismo",
    });
  }

  try {
    const usuario = await Usuario.findOne({ email }).select(
      "-createdAt -updatedAt -token -confirmado -password -__v"
    );

    if (!usuario)
      return res.status(404).json({
        msg: "No se encontro ese usuario",
      });

    const proyecto = await Proyecto.findById(id)
      .where("creador")
      .equals(req.usuario.id);

    if (!proyecto)
      return res.status(403).json({
        msg: "El Proyecto no se a encontrado o no tienes los permisos",
      });

    if (proyecto.colaboradores.id(usuario._id)) {
      return res.status(400).json({
        msg: "El Usuario ya se encuentra en el proyecto",
      });
    }

    proyecto.colaboradores.push(usuario._id);

    await proyecto.save();

    return res.status(200).json({
      msg: "Agregado al proyecto !",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "hubo un error",
    });
  }
};

const eliminarColaborador = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  if (email == req.usuario.email) {
    return res.status(400).json({
      msg: "No te puedes agregar a ti mismo",
    });
  }

  if (!email) {
    return res.status(400).json({
      msg: "Debes colocar un email",
    });
  }
  try {
    const usuario = await Usuario.findOne({ email }).select(
      "-createdAt -updatedAt -token -confirmado -password -__v"
    );

    if (!usuario)
      return res.status(404).json({
        msg: "No se encontro ese usuario",
      });

    const proyecto = await Proyecto.findById({ id })
      .where("creador")
      .equals(req.usuario.id);

    if (!proyecto)
      return res.status(403).json({
        msg: "El Proyecto no se a encontrado o no tienes los permisos",
      });

    proyecto.colaboradores.pull(usuario._id);

    await proyecto.save();

    return res.status(200).json({
      msg: "Eliminado del proyecto !",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "hubo un error",
    });
  }
};

module.exports = {
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
};
