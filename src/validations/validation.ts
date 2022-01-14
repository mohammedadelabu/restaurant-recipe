import Joi from 'joi';
import { Sign, Login, Recipe } from '../routes/interface';

export const validateRecipe = (data: Recipe) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        meal_type: Joi.string().required(),
        difficulty_level: Joi.string().required(),
        ingredients: Joi.array().required(),
        preparation: Joi.string().required(),
    });
    return schema.validate(data);
}

    export const validateUpdate = (update: Recipe) => {
    const schema = Joi.object({
        title: Joi.string(),
        meal_type: Joi.string(),
        difficulty_level: Joi.string(),
        ingredients: Joi.array(),
        preparation: Joi.string(),
    });
    return schema.validate(update);
}

export const validateSignup = (user: Sign) => {
    const schema = Joi.object({
        fullname: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return schema.validate(user);
}

export const validateLogin = (person: Login) => {
    const schema = Joi.object({
        fullname: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return schema.validate(person);
}
