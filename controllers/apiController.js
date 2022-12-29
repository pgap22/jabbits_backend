const axios = require("axios");
const { emailContacto } = require("../helpers/email");


const enviarDatosContacto = async (req, res) => {
  const { nombre, email, select, message, captcha } = req.body;
  try {

    const { data } = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_CAPTCHA}&response=${captcha}`
    );
    
    if (!data.success)
      return res.status(400).json({
        msg: "Captcha Invalido",
      });

    emailContacto(nombre, email, message, select);

    return res.status(200).json({
      msg: "Mensaje Enviado !",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  enviarDatosContacto,
};
