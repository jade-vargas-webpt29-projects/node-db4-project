const db = require('.././data/db-config');

const getRecipeById = (id) => {
  return db('recipes').where('recipe_id', id).first();
};

const getStepsForRecipe = (id) => {
  return db('steps').orderBy('step_number').where('recipe_id', id);
};

module.exports = {
  getRecipeById,
  getStepsForRecipe,
};
