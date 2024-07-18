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

export const validateProfile = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    phone: Joi.string()
        .min(10)
        .max(10)
        .pattern(new RegExp('^[0-9]{10}$'))
        .allow(null, ''),
        // Phone can be number a number


    address: Joi.string()
        .min(3)
        .max(30)
        .required(),

    _id: Joi.string()
        .required(),

     email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
});

export const validateStatus = Joi.object({
    // Allow extra fields
    gender: Joi.string()
        .valid(),
    age: Joi.number()
        .min(1)
        .max(100)
        .required(),
    height: Joi.number()
        .min(1)
        .max(300)
        .required(),
    weight: Joi.number()
        .min(1)
        .max(300)
        .required(),
    target_weight: Joi.number()
        .min(1)
        .max(300)
        .required(),
    target_calories: Joi.number()
        .min(1)
        .max(4000)
        .required(),
    phy_activity: Joi.string()
        .valid(),
    target_speed: Joi.string()
        .valid(),
}).unknown(true);
