const Joi = require("joi");

const creditPackageValidator ={

  createSchema: Joi.object({
    name: Joi.string().trim().min(1).max(50).required(),
    credit_amount: Joi.number().integer().min(1).required(),
    price: Joi.number().min(1).required(),
  }),
  
  idSchema: Joi.string().uuid().required(),

  purchaseSchema: Joi.object({
    user_id: Joi.string().uuid().required(),
    credit_package_id: Joi.string().uuid().required(),
  }),
}

module.exports = creditPackageValidator;
