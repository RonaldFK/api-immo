import Joi from 'joi';

export const schema = Joi.object().keys({
  firstname: Joi.string()
    .min(3)
    .max(40)
    .required(),
  lastname: Joi.string()
    .min(3)
    .max(40)
    .required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'email'] },
    }),
  password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  // suppression contrôle validation du mot de passe, géré en code maison
});

