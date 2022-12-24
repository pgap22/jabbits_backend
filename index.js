const cors = require("cors");
const express = require("express");
const db = require("./config/db");
const usuarioRoutes = require("./routes/usuarioRoutes");
const proyectoRoutes = require("./routes/proyectosRoutes");
const tareaRoutes = require("./routes/tareaRoutes");
const app = express();

app.use(express.json());

// const whiteList = ['http://localhost:4000','http://localhost:5173','http://192.168.0.12:5173']

// const corsOptions = {
//   origin: function(origin, callback){
//     if(whiteList.includes(origin)){
//       callback(null,true)
//     }else{
//       callback('Pay me $40 or use Jabbits',false)
//     }
//   }
// }

app.use(cors());

require("dotenv").config();
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTdlY2JkN2UyMjRlYmJmYjMxNWM0OSIsImlhdCI6MTY3MTA3MDM1NiwiZXhwIjoxNjczNjYyMzU2fQ.VSPulvRDjvFQM5enyEfUwSKBbnXdn8WKjwZaQCQrXvo
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTg5ZjI2MGFhZTEzM2FhNTJiYzc3ZiIsImlhdCI6MTY3MTA3NTM1MywiZXhwIjoxNjczNjY3MzUzfQ.D7814K-YhuXU4Zss63Zah9yL6xHYqL53CHAPRErKvPU
db();

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tarea", tareaRoutes);

const port = process.env.PORT || 4000;

const servidor = app.listen(port, () => {
  console.log("Ready ! " + port);
});

const {Server} = require("socket.io")

let io = new Server(servidor, {
  pingTimeout: 6000,
  cors: {
    origin: process.env.URL_FRONTEND,
  },
});

io.on("connection", (socket) => {

  socket.on("abrir-proyecto", (proyectoID) => {
    console.log("JOINED TO "+proyectoID);
    socket.join(proyectoID);
  });

  socket.on("nueva-tarea", (tarea) => {
    socket.to(tarea.proyecto).emit("tarea-agregada",tarea);
  });

  socket.on("eliminar-tarea",(tarea)=> {
    console.log(tarea);
    socket.to(tarea.proyecto_id).emit("tarea-eliminada",tarea);
  })
  socket.on("editar-tarea",(tareaEditada)=> {
    console.log(tareaEditada);
    socket.to(tareaEditada.proyecto_id).emit("tarea-editada",tareaEditada.tarea);
  })

});
