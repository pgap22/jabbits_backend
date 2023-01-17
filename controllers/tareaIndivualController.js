const TareaIndivualModelo = require("../models/TareaIndividual");

const crearTarea = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const tarea = new TareaIndivualModelo(req.body);

    tarea.creador = req.usuario._id;

    if (!nombre) {
      return res.status(400).json({ msg: "El Nombre es obligatorio" });
    }
    if (!descripcion) {
      return res.status(400).json({ msg: "La descripcion es obligatoria" });
    }

    await tarea.save();
    return res.status(200).json(tarea);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Se ha producido un error" });
  }
};

const leerTareas = async (req, res) => {
  const { _id: idUsuario } = req.usuario;
  try {
    const tareasUsuario = await TareaIndivualModelo.find({
      creador: { $eq: idUsuario },
    });
    return res.status(200).json(tareasUsuario);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Hubo un error" });
  }
};
const eliminarTarea = async (req, res) => {
  const { id: idTareaEliminar } = req.params;

  try {
    const tarea = await TareaIndivualModelo.findByIdAndRemove(idTareaEliminar);

    if(!tarea){
        return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    return res.status(200).json({ msg: "Tarea Eliminada" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Hubo un error" });
  }
};
const editarTarea = async (req, res) => {
  const { id: idTareaEditar } = req.params;

  const { nombre, descripcion } = req.body;

  if (!nombre) {
    return res.status(400).json({ msg: "El Nombre es obligatorio" });
  }
  if (!descripcion) {
    return res.status(400).json({ msg: "La descripcion es obligatoria" });
  }

  try {
    const tareaActualizada = await TareaIndivualModelo.findByIdAndUpdate(
      idTareaEditar,
      req.body,
      { new: true }
    );

    return res.status(200).json(tareaActualizada);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Hubo un error" });
  }
};

module.exports = {
  crearTarea,
  leerTareas,
  eliminarTarea,
  editarTarea,
};
