const Joi = require("joi");

const skillValidator ={

  createSchema: Joi.string().trim().min(1).max(50).required(),
  
  idSchema: Joi.string().uuid().required()
}

module.exports = skillValidator;
