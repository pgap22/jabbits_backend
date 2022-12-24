const mongoose = require("mongoose");
const Proyecto = require("./Proyecto");

const tareaSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    descripcion: {
      type: String,
      trim: true,
      required: true,
    },
    tags: [
      {
        nombre: {
          type: String,
          trim: true,
          required: true,
        },
        color: {
          type: String,
          trim: true,
          default: "#a3a3a3",
        },
        mandatory: {
          type: Boolean,
          default: false,
        },
      },
    ],
    creadorPor: {
      type: mongoose.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    estado: {
      type: Boolean,
      default: false,
    },
    fechaEntrega: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    prioridad: {
      type: String,
      required: true,
      enum: ["Baja", "Media", "Alta"],
    },
    proyecto: {
      type: mongoose.Types.ObjectId,
      ref: Proyecto,
    },
  },
  {
    timestamp: true,
  }
);

const Tarea = mongoose.model("Tarea", tareaSchema);
module.exports = Tarea;
