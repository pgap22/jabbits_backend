const { default: mongoose } = require("mongoose");
const Proyecto = require("../models/Proyecto");
const Tarea = require("../models/Tarea");

const agregarTarea = async (req, res) => {
  const { proyecto, tags, prioridad } = req.body;

  if (!tags) {
    req.body.tags = [
      {
        nombre: prioridad,
        mandatory: true,
      },
    ];
  } else {
    req.body.tags = [
      {
        nombre: prioridad,
        mandatory: true,
      },
      ...tags,
    ];
  }

  try {
    const proyectoTarea = await Proyecto.findById(proyecto).or([
      { creador: req.usuario.id },
      { colaboradores: { $in: [mongoose.Types.ObjectId(req.usuario.id)] } },
    ]);

    if (!proyectoTarea) {
      return res
        .status(403)
        .json({ status: "error", msg: "No estas autorizado" });
    }

    const tarea = await Tarea.create(req.body);

    await tarea.populate({
      path: "creadorPor",
      select:
        "-token -password -_id -createdAt -updatedAt -confirmado -invitaciones -__v",
    });

    proyectoTarea.tareas.push(tarea._id);
    await proyectoTarea.save();
    return res.status(200).json(tarea);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const obtenerTarea = async (req, res) => {
  const {tags} = req.body;

  if(tags.every(tag => tag.mandatory)) return res.status(403).json({
    msg: 'No puedes modificar este valor !'
  })

  const tarea = await Tarea.findById(req.params.id).populate({
    path: "proyecto",
    match: {
      $or: [
        { creador: req.usuario.id },
        { colaboradores: { $in: [mongoose.Types.ObjectId(req.usuario.id)] } },
      ],
    },
  });

  if (!tarea) {
    return res
      .status(404)
      .json({ status: "error", msg: "Tarea no encontrada" });
  }

  if (!tarea.proyecto) {
    return res
      .status(403)
      .json({ status: "error", msg: "No estas autorizado" });
  }

  return res.status(200).json(tarea);
};
const actualizarTarea = async (req, res) => {
  if (Object.entries(req.body).length === 0) {
    return res.status(400).json({ type: "error", msg: "Contenido Vacio" });
  }

  const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .populate({
      path: "proyecto",
      match: {
        $or: [
          { creador: req.usuario.id },
          { colaboradores: { $in: [mongoose.Types.ObjectId(req.usuario.id)] } },
        ],
      },
    })
    .where("proyecto")
    .ne(null);

  if (!tarea) {
    return res.status(404).json({ type: "error", msg: "No encontrado" });
  }

  if (!tarea.proyecto) {
    return res
      .status(401)
      .json({ status: "error", msg: "No estas autorizado" });
  }

  await tarea.populate({
    path: "creadorPor",
    select:
      "-token -password -_id -createdAt -updatedAt -confirmado -invitaciones -__v",
  });

  return res.status(200).json(tarea);
};
const eliminarTarea = async (req, res) => {
  const tarea = await Tarea.findByIdAndDelete(req.params.id)
    .populate({
      path: "proyecto",
      match: {
        $or: [
          { creador: req.usuario.id },
          { colaboradores: { $in: [mongoose.Types.ObjectId(req.usuario.id)] } },
        ],
      },
    })
    .where("proyecto")
    .ne(null);

  if (!tarea) {
    return res.status(404).json({ type: "error", msg: "No encontrado" });
  }

  if (!tarea.proyecto) {
    return res
      .status(401)
      .json({ status: "error", msg: "No estas autorizado" });
  }

  const proyectos = await Proyecto.findById(tarea.proyecto._id).or([
    { creador: req.usuario.id },
    { colaboradores: { $in: [mongoose.Types.ObjectId(req.usuario.id)] } },
  ]);

  proyectos.tareas.pull(req.params.id);
  await proyectos.save();

  return res.status(200).json({ status: "success", msg: "Tarea Eliminada" });
};
const cambiarEstado = async (req, res) => {};

module.exports = {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
};
