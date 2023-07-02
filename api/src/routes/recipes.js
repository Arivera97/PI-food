const { Router } = require('express')
const {
  getRecipeHandler,
  getRecipesHandler,
  createRecipesHandler,
} = require('../handlers/RecipesHandler')

const recipes = Router()

//Ruta para ver TODAS LAS RECETAS
recipes.get('/', getRecipesHandler)
// Ruta para obtener el detalle de una receta específica por su ID
recipes.get('/:id', getRecipeHandler)
// Ruta para crear una nueva receta
recipes.post('/', createRecipesHandler)

module.exports = recipes
