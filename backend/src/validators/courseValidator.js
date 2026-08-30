const Joi = require("joi");

const urlPattern = /^https:\/\//;

const courseValidator ={

  createSchema: Joi.object({
    user_id: Joi.string().uuid().required(),
    skill_id: Joi.string().uuid().required(),
    name: Joi.string().trim().min(1).max(50).required(),
    description: Joi.string().trim().required(),
    start_at: Joi.date().iso().required(),
    end_at: Joi.date().iso().greater(Joi.ref("start_at")).required(),
    max_participants: Joi.number().min(1).required(),
    meeting_url:Joi.string().pattern(urlPattern).required(),
  }),

  getCourseSchema: Joi.object({
    user_id: Joi.string().uuid().required(),
    course_id: Joi.string().uuid().required(),
  }),

  updateCourseSchema: Joi.object({
    course_id: Joi.string().uuid().required(),
    user_id: Joi.string().uuid().required(),
    skill_id: Joi.string().uuid().required(),
    name: Joi.string().trim().min(1).max(50).required(),
    description: Joi.string().trim().required(),
    start_at: Joi.date().iso().required(),
    end_at: Joi.date().iso().greater(Joi.ref("start_at")).required(),
    max_participants: Joi.number().min(1).required(),
    meeting_url:Joi.string().pattern(urlPattern).required(),
  }),
  
  idSchema: Joi.string().uuid().required(),

}

module.exports = courseValidator;
