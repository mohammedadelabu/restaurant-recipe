"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RecipeSchema = new mongoose_1.default.Schema({
    title: { type: String },
    meal_type: { type: String, enum: ["breakfast", "lunch", "supper", "snack"], required: true },
    difficulty_level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
    ingredients: { type: Array, required: true },
    preparation: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose_1.default.model("Recipe", RecipeSchema);
