const mongoose = require("mongoose");

const proyectoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
    
    descripcion:{
        type: String,
        required: true,
        trim: true,
    },

    fechaEntrega:{
        type: Date,
        default: Date.now(),
        required: true,
        
    },
    creador:{
        type: mongoose.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    tareas: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Tarea',
        }
    ],
    colaboradores:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'Usuario',    
        }
    ],

},{
    timestamp: true,
})

proyectoSchema.index({creador: 1})



const Proyecto = mongoose.model('Proyecto', proyectoSchema);
module.exports = Proyecto;