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
    <table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; background-color: #f9f9f9; width: 100%;">
    <tr>
      <td style="padding: 20px; background-color: white; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <h1 style="font-size: 24px; margin-bottom: 20px;">Confirma tu cuenta<</h1>
        <p style="font-size: 16px; color: #444; line-height: 1.5;">Hola <span style="font-weight: bold;">${nombre}</span>, Gracias por crear tu cuenta en Jabbits. Haz click en el boton para confirmar tu cuenta y empezar a usar Jabbits/p>
        <a href="${process.env.URL_FRONTEND}/confirm/${token}" style="display: inline-block; font-size: 16px; font-weight: bold; color: white; text-decoration: none; background-color: black; padding: 10px 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: all 0.3s ease;" class="confirm-button">Confirma tu cuenta</a>
      </td>
    </tr>
  </table>
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
    <table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; background-color: #f9f9f9; width: 100%;">
    <tr>
      <td style="padding: 20px; background-color: white; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <h1 style="font-size: 24px; margin-bottom: 20px;">Cambia tu contraseña</h1>
        <p style="font-size: 16px; color: #444; line-height: 1.5;">Hola <span style="font-weight: bold;">${nombre}</span>, Ahora puedes cambiar tu contraseña haciendo click en el boton</p>
        <a href="${process.env.URL_FRONTEND}/forget-password/${token}" style="display: inline-block; font-size: 16px; font-weight: bold; color: white; text-decoration: none; background-color: black; padding: 10px 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: all 0.3s ease;" class="confirm-button">Cambia tu contraseña</a>
      </td>
    </tr>
  </table>
    `,
  });
};

const emailInvitacion = async (nombre, email, proyectoID, proyectoNombre) => {
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
    <table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; background-color: #f9f9f9; width: 100%;">
    <tr>
      <td style="padding: 20px; background-color: white; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <h1 style="font-size: 24px; margin-bottom: 20px;">Invitacion de proyecto</h1>
        <p style="font-size: 16px; color: #444; line-height: 1.5;">Hola <span style="font-weight: bold;">${nombre}</span>, Has sido invitado a <span style="font-weight: bold;">${proyectoNombre}</span> Has click en el boton para aceptar la invitacion</p><a href="${process.env.URL_FRONTEND}/accept-proyect/${proyectoID}" style="display: inline-block; font-size: 16px; font-weight: bold; color: white; text-decoration: none; background-color: #15803d; padding: 10px 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: all 0.3s ease;" class="confirm-button">Aceptar invitacion</a>
      </td>
    </tr>
  </table>
    `,
  });
};
const emailContacto = async (nombre, email, message, titulo) => {
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
    to: "gerardo.saz120@gmail.com",
    subject: "Jabbits: " + titulo,
    text: "Jabbits: " + titulo,
    html: `
    <table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; background-color: #f9f9f9; width: 100%;">
    <tr>
      <td style="padding: 20px; background-color: white; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <h1 style="font-size: 24px; margin-bottom: 20px;">${titulo}</h1>
        <p style="font-size: 16px; color: #444; line-height: 1.5;">El usuario <span style="font-weight: bold;">${nombre}</span> Ha enviado un mensaje a jabbits.</p>
        <p style="font-size: 16px; color: #444; line-height: 1.5;">Email: <span style="font-weight: bold;">${email}</span></p><br/><br/>
  <i style="font-style: italic;">${message}</i>
      </td>
    </tr>
  </table>
    `,
  });
};
module.exports = {
  emailRegistro,
  emailPassword,
  emailInvitacion,
  emailContacto,
};
