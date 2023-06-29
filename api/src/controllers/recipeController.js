const axios = require("axios");
const { Recipe } = require("../db");
const API_KEY = process.env.API_KEY;

const cleanArray = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.title,
      summary: elem.summary,
      heart_score: elem.healthScore,
      imagen: elem.image,
      steps: elem.analyzedInstructions,
      created: false,
    };
  });

const createRecipe = async (id, name, summary, imagen, heart_score, steps) =>
  await Recipe.create({ id, name, summary, imagen, heart_score, steps });

const getRecipeById = async (id, source) => {
  const recipe =
    source === "api"
      ? (
          await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
          )
        ).data
      : await Recipe.findByPk(id);

  return recipe;
};

const getAllRecipes = async () => {
  const databaseRecipes = await Recipe.findAll();
  const apiRecipesRaw = (
    await axios.get(
      `http://localhost:8080/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
    )
  ).data.results;

  const apiRecipes = cleanArray(apiRecipesRaw);

  return [...databaseRecipes, ...apiRecipes];
};

const searchRecipes = async (name) => {
  const databaseRecipes = await Recipe.findAll({
    where: {
      name,
    },
  });
  const apiRecipesRaw = (
    await axios.get(
      `http://localhost:8080/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
    )
  ).data.results;

  const apiRecipes = cleanArray(apiRecipesRaw);

  const filterApi = apiRecipes.filter((user) => {
    user.name === name;
  });
  return [...filterApi, ...databaseRecipes]
};

module.exports = {
  createRecipe,
  getRecipeById,
  getAllRecipes,
  searchRecipes,
};
