const { Router } = require("express");

const {
  createRecipesHandler,
  getRecipeHandler,
  getRecipesHandler,
} = require("../handlers/RecipesHandler");

const recipesRouter = Router();

recipesRouter.get("/:idRecipe", getRecipesHandler);
recipesRouter.get("/", getRecipeHandler);
recipesRouter.post("/recipes", createRecipesHandler);

module.exports = recipesRouter;
