const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const { loadingEffect, clearLastLine } = require("../helpers/dbMessage");


const loadingId = loadingEffect();

const db = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  
    clearInterval(loadingId);
    clearLastLine();
    console.log(`Conectado a ${connection.connection.host}`);  
    console.log(``);  
  } catch (error) {
    console.log(error.message);
    process.exit(1)
  }
};
module.exports = db;
