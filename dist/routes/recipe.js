"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Recipe = require("../models/Recipe");
const { verifyToken } = require("./verifyToken");
const validation_1 = require("../validations/validation");
const router = require("express").Router();
// CREATE
router.post("/", verifyToken, async (req, res, next) => {
    try {
        const newRecipe = new Recipe(req.body);
        const isValid = (0, validation_1.validateRecipe)(req.body);
        if (isValid.error) {
            return res.status(400).json({
                status: "error",
                message: isValid.error.details[0].message,
            });
        }
        else {
            const savedRecipe = await newRecipe.save();
            res.json({ success: true, message: "A recipe has been created", savedRecipe }).status(201);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// UPDATE ALL
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const isValid = (0, validation_1.validateUpdate)(req.body);
        if (isValid.error) {
            return res.status(400).json({
                status: "error",
                message: isValid.error.details[0].message,
            });
        }
        else {
            const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json(updatedRecipe);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// DELETE
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.status(200).json("Recipe has been deleted....");
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// GET A Recipe
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        res.status(200).json(recipe);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// GET ALL RecipeS Pagination
router.get("/data/:pageno", verifyToken, async (req, res) => {
    try {
        let page = Number(req.params.pageno);
        let size = Number(5);
        if (!page)
            page = 1;
        if (!size)
            size = 5;
        const limit = size;
        const skip = (page - 1) * size;
        const recipes = await Recipe.find().limit(limit).skip(skip);
        res.status(200).send(recipes);
    }
    catch (error) {
        res.status(500).send({ message: error || 'Error Occured' });
    }
});
// GET ALL RecipeS
router.get("/all/data", verifyToken, async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).send(recipes);
    }
    catch (error) {
        res.status(500).send({ message: error || 'Error Occured' });
    }
});
// // PAGINATION
// router.get('/recipes/:page', function(req: any, res: any, next: any) {
//   const perPage = 5
//   const page = req.params.page || 1
//   Recipe
//       .find({})
//       .skip((perPage * page) - perPage)
//       .limit(perPage)
//       .exec(function(err: any, recipes: any) {
//           Recipe.count().exec((err: any, count: any) => {
//               if (err)
//                 return next(err);
//               res.render('recipe/recipes', {
//                 recipes: recipes,
//                 current: page,
//                 pages: Math.ceil(count / perPage)
//               });
//             })
//       })
// })
exports.default = router;
