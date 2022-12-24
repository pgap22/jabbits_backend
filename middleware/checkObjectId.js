const { default: mongoose } = require("mongoose");

const checkObjectId = async (req, res, next) => {
  if (mongoose.isValidObjectId(req.params.id)) return next();
  return res.status(400).json({
    msg: 'Url Invalida'
  })
};

module.exports = checkObjectId;
