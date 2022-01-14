"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mosh = require("../models/Mosh");
const { verifyToken } = require("./verifyToken");
const router = require("express").Router();
// CREATE
router.post("/", verifyToken, async (req, res) => {
    const newMosh = new Mosh(req.body);
    try {
        const savedMosh = await newMosh.save();
        res.status(200).json(savedMosh);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// // UPDATE
// router.put("/:id", verifyToken, async (req: any, res: any) => {
//   try {
//     const updatedRecipe = await Recipe.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedRecipe);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// // DELETE
// router.delete("/:id", verifyToken, async (req: any, res: any) => {
//   try {
//     await Recipe.findByIdAndDelete(req.params.id);
//     res.status(200).json("Recipe has been deleted....");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// // GET A Recipe
// router.get("/:id", verifyToken, async (req: any, res: any) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id);
//     res.status(200).json(recipe);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// // GET ALL RecipeS
// router.get("/", verifyToken, async (req: any, res: any) => {
//   const qNew = req.query.new;
//   const qCategory = req.query.category;
//   try {
//     let recipes;
//     if (qNew) {
//       recipes = await Recipe.find().sort({ createdAt: -1 }).limit(1);
//     } else if (qCategory) {
//       recipes = await Recipe.find({
//         categories: {
//           $in: [qCategory],
//         },
//       });
//     } else {
//       recipes = await Recipe.find();
//     }
//     res.status(200).json(recipes);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
module.exports = router;
