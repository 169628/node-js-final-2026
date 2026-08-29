const Joi = require("joi");

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;

const userValidator ={

  createSchema: Joi.object({
    name: Joi.string().trim().min(1).max(50).required(),
    email: Joi.string().trim().email().max(320).lowercase().required(),
    password: Joi.string().pattern(passwordPattern).required(),
  }),

  loginSchema: Joi.object({
    email: Joi.string().trim().email().max(320).lowercase().required(),
    password: Joi.string().pattern(passwordPattern).required(),
  }),
  
  idSchema: Joi.string().uuid().required(),

  updateNameSchema: Joi.object({
    name: Joi.string().trim().min(1).max(50).required(),
    id: Joi.string().uuid().required(),
  }),

  updatePasswordSchema: Joi.object({
    password: Joi.string().pattern(passwordPattern).required(),
    new_password: Joi.string().pattern(passwordPattern).required(),
    confirm_new_password: Joi.string().pattern(passwordPattern).required(),
    id: Joi.string().uuid().required(),
  }),
}

module.exports = userValidator;
