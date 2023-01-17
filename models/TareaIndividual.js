const moongose = require('mongoose');

const tareaIndividualSchema = moongose.Schema({

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

    fecha: {
        type: Date,
        required: true,
        default: Date.now(),
    },

    status:{
        type: String,
        required: true,
        trim: true,
        default: 'pending',
        enum: ['completed', 'pending', 'expired']
    },
    creador: {
        type: moongose.Types.ObjectId,
        ref: 'Usuario'
    }

},{
    timestamp: true,
})

const TareaIndivualModelo = moongose.model('tareaIndividual',tareaIndividualSchema)
module.exports = TareaIndivualModelo