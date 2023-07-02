const axios = require('axios')
const { Recipe } = require('../db')
const API_KEY = process.env.API_KEY
const { Sequelize } = require('sequelize')

const cleanArray = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.title,
      summary: elem.summary,
      heart_score: elem.healthScore,
      imagen: elem.image,
      steps:
        elem.analyzedInstructions[0] && elem.analyzedInstructions[0].steps
          ? elem.analyzedInstructions[0].steps.map((s) => s.step)
          : '',
      created: false,
    }
  })

const cleanObject = (obj) => {
  return {
    id: obj.id,
    name: obj.name,
    summary: obj.summary,
    heart_score: obj.healthScore,
    imagen: obj.image,
    steps:
      obj.analyzedInstructions[0] && obj.analyzedInstructions[0].steps
        ? obj.analyzedInstructions[0].steps.map((s) => s.step)
        : '',
    diets: obj.diets,

    created: false,
  }
}

const createRecipe = async (id, name, summary, imagen, heart_score, steps) =>
  await Recipe.create({ id, name, summary, imagen, heart_score, steps })

const getRecipeById = async (id, source) => {
  let recipe
  if (source === 'api') {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    )
    recipe = response.data
    recipe = cleanObject(recipe)
  } else {
    recipe = await Recipe.findByPk(id)
    // Obtener las dietas asociadas
    const diets = await recipe.getDiets()
    // Filtrar las dietas para obtener solo los nombres
    const dietNames = diets.map((diet) => diet.name)
    // Agregar las dietas al objeto de receta
    recipe = { ...recipe.toJSON(), diets: dietNames }
  }

  return recipe
}

const getAllRecipes = async () => {
  const databaseRecipes = await Recipe.findAll()
  const apiRecipesRaw = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
    )
  ).data.results

  const apiRecipes = cleanArray(apiRecipesRaw)

  return [...databaseRecipes, ...apiRecipes]
}

const searchRecipes = async (name) => {
  const normalizedQuery = name.toLowerCase()
  const databaseRecipes = await Recipe.findAll({
    where: Sequelize.where(
      Sequelize.fn('lower', Sequelize.col('name')),
      'LIKE',
      `%${normalizedQuery}%`
    ),
    limit: 15,
  })

  const apiRecipesRaw = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
    )
  ).data.results

  const apiRecipes = cleanArray(apiRecipesRaw)

  const filterApi = apiRecipes.filter((recipe) => {
    return recipe.name.toLowerCase().startsWith(normalizedQuery)
  })

  if (databaseRecipes.length === 0 && filterApi.length === 0) {
    return 'No se encontraron recetas.'
  }

  return [...filterApi, ...databaseRecipes]
}

module.exports = {
  createRecipe,
  getRecipeById,
  getAllRecipes,
  searchRecipes,
}
