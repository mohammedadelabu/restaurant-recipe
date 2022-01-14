import mongoose from 'mongoose'

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String },
    meal_type: { type: String, enum: ["breakfast", "lunch", "supper", "snack"], required: true },
    difficulty_level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true},
    ingredients: { type: Array, required: true },
    preparation: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
