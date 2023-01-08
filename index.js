const cors = require("cors");
const express = require("express");
const db = require("./config/db");
const usuarioRoutes = require("./routes/usuarioRoutes");
const proyectoRoutes = require("./routes/proyectosRoutes");
const tareaRoutes = require("./routes/tareaRoutes");
const apiRoutes = require("./routes/apiRoutes");
const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json());

const whiteList = [process.env.URL_FRONTEND,'http://localhost:5173']

const corsOptions = {
  origin: function(origin, callback){
    if(whiteList.includes(origin)){
      callback(null,true)
    }else{
      callback('Pay me $40 or use Jabbits',false)
    }
  }
}

app.use(cors(corsOptions));

require("dotenv").config();
db();

app.use("/api", apiRoutes)
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tarea", tareaRoutes);


const port = process.env.PORT || 4000;

const servidor = app.listen(port, () => {
  console.log("Ready ! " + port);
});

const {Server} = require("socket.io");

let io = new Server(servidor, {
  pingTimeout: 6000,
  cors: {
    origin: whiteList,
  },
});

io.on("connection", (socket) => {

  socket.on("abrir-proyecto", (proyectoID) => {
    socket.join(proyectoID);
  });

  socket.on("nueva-tarea", (tarea) => {
    socket.to(tarea.proyecto).emit("tarea-agregada",tarea);
  });

  socket.on("eliminar-tarea",(tarea)=> {
    socket.to(tarea.proyecto_id).emit("tarea-eliminada",tarea);
  })
  socket.on("editar-tarea",(tareaEditada)=> {
    socket.to(tareaEditada.proyecto_id).emit("tarea-editada",tareaEditada.tarea);
  })

});
