"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateSignup = exports.validateUpdate = exports.validateRecipe = void 0;
const joi_1 = __importDefault(require("joi"));
const validateRecipe = (data) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required(),
        meal_type: joi_1.default.string().required(),
        difficulty_level: joi_1.default.string().required(),
        ingredients: joi_1.default.array().required(),
        preparation: joi_1.default.string().required(),
    });
    return schema.validate(data);
};
exports.validateRecipe = validateRecipe;
const validateUpdate = (update) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string(),
        meal_type: joi_1.default.string(),
        difficulty_level: joi_1.default.string(),
        ingredients: joi_1.default.array(),
        preparation: joi_1.default.string(),
    });
    return schema.validate(update);
};
exports.validateUpdate = validateUpdate;
const validateSignup = (user) => {
    const schema = joi_1.default.object({
        fullname: joi_1.default.string().min(2).max(50).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return schema.validate(user);
};
exports.validateSignup = validateSignup;
const validateLogin = (person) => {
    const schema = joi_1.default.object({
        fullname: joi_1.default.string().min(2).max(50).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return schema.validate(person);
};
exports.validateLogin = validateLogin;
