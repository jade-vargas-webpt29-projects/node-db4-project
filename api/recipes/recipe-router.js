const express = require('express');
const Recipes = require('./recipe-model.js');

const router = express.Router();

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  let recipe = Recipes.getRecipeById(id);
  const steps = Recipes.getStepsForRecipe(id);
  recipe = { ...recipe, steps: steps };
  res.json(recipe);
});

module.exports = router;
