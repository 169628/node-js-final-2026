const Joi = require("joi");

const urlPattern = /^https:\/\//;

const coachValidator ={

  createSchema: Joi.object({
    user_id:Joi.string().uuid().required(),
    experience_years: Joi.number().min(1).required(),
    description: Joi.string().trim().required(),
    profile_image_url: Joi.string().pattern(urlPattern).allow("").optional(),
  }),

  updateSchema: Joi.object({
    user_id:Joi.string().uuid().required(),
    experience_years: Joi.number().min(1).required(),
    description: Joi.string().trim().required(),
    profile_image_url: Joi.string().pattern(urlPattern).required(),
    skill_ids: Joi.array().items(Joi.string().uuid().required()).min(1).required(),
  }),
  
  idSchema: Joi.string().uuid().required(),

  listSchema: Joi.object({
    per: Joi.number().integer().min(0).required(),
    page: Joi.number().integer().min(0).required(),
  }),

}

module.exports = coachValidator;
