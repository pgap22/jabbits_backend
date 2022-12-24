const nodemailer = require("nodemailer");

const emailRegistro = async ({ nombre, email, token }) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: "'Jabbits - Haz tu proyectos de una mejor manera' <jabbits@jabbits.com>",
    to: email,
    subject: "Confirma tu cuenta",
    text: "Confirma tu cuenta",
    html: `
    <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
      padding: 20px;
      background-color: white;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    span{
      font-weight: bold;
    }
    h1 {
      font-size: 24px;
      margin-bottom: 20px;
    }
    
    p {
      font-size: 16px;
      color: #444;
      line-height: 1.5;
    }
    
    .confirm-button {
      display: inline-block;
      font-size: 16px;
      font-weight: bold;
      color: white;
      text-decoration: none;
      background-color: black;
      padding: 10px 20px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    </style>
    <body>
    <div class="container">
      <h1>Confirma tu cuenta</h1>
      <p>Hola <span>${nombre}</span>, Gracias por crear tu cuenta en Jabbits. Haz click en el boton para confirmar tu cuenta y empezar a usar Jabbits</p>
      <a href="${process.env.URL_FRONTEND}/confirm/${token}" class="confirm-button">Confirma tu cuenta</a>
    </div>
  </body>
    `,
  });
};
const emailPassword = async ({ nombre, email, token }) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: "'Jabbits - Haz tu proyectos de una mejor manera' <jabbits@jabbits.com>",
    to: email,
    subject: "Cambia tu contraseña",
    text: "Cambia tu contraseña",
    html: `
    <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
      padding: 20px;
      background-color: white;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    span{
      font-weight: bold;
    }
    h1 {
      font-size: 24px;
      margin-bottom: 20px;
    }
    
    p {
      font-size: 16px;
      color: #444;
      line-height: 1.5;
    }
    
    .confirm-button {
      display: inline-block;
      font-size: 16px;
      font-weight: bold;
      color: white;
      text-decoration: none;
      background-color: black;
      padding: 10px 20px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    </style>
    <body>
    <div class="container">
      <h1>Cambia tu contraseña</h1>
      <p>Hola <span>${nombre}</span>, Ahora puedes cambiar tu contraseña haciendo click en el boton</p>
      <a href="${process.env.URL_FRONTEND}/forget-password/${token}" class="confirm-button">Cambia tu contraseña</a>
    </div>
  </body>
    `,
  });
};

const emailInvitacion = async (nombre,email,proyectoID,proyectoNombre)=>{
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: "'Jabbits - Haz tu proyectos de una mejor manera' <jabbits@jabbits.com>",
    to: email,
    subject: "Invitacion de proyecto",
    text: "Invitacion de proyecto",
    html: `
    <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
      padding: 20px;
      background-color: white;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    span{
      font-weight: bold;
    }
    h1 {
      font-size: 24px;
      margin-bottom: 20px;
    }
    
    p {
      font-size: 16px;
      color: #444;
      line-height: 1.5;
    }
    
    .confirm-button {
      display: inline-block;
      font-size: 16px;
      font-weight: bold;
      color: white;
      text-decoration: none;
      background-color: #15803d;
      padding: 10px 20px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    </style>
    <body>
    <div class="container">
      <h1>Invitacion de proyecto</h1>
      <p>Hola <span>${nombre}</span>, Has sido invitado a <span>${proyectoNombre}</span> Has click en el boton para aceptar la invitacion</p>
      <a href="${process.env.URL_FRONTEND}/accept-proyect/${proyectoID}" class="confirm-button">Aceptar invitacion</a>
    </div>
  </body>
    `,
  });
}
module.exports = {
  emailRegistro,
  emailPassword,
  emailInvitacion,
};
