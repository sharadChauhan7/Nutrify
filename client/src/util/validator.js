import Joi from 'joi'

export const validateSignup = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    phone: Joi.string()
        .pattern(new RegExp('^[0-9]{10}$'))
        .allow(null, ''),

    password: Joi.string()
        .min(6)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

});

export const validateLogin = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    password: Joi.string()
        .min(6)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
});