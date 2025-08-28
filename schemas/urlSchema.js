import Joi from 'joi';

const urlSchema = Joi.object({
  originalHref: Joi.string().uri().required().messages({
    'string.uri': 'originalHref must be a valid URI',
    'any.required': 'originalHref is required'
  })
})
.required()
.strict();

export default urlSchema;