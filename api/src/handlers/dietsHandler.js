const API_KEY = process.env.API_KEY
const axios = require('axios')
const { Diet } = require('../db')
// (
//     `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
//   )

async function getDietsHandler(req, res, next) {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
      )
      const data = response.data
  
      const diets = new Set() // Usamos un Set para evitar duplicados
      data.results.forEach((recipe) => {
        recipe.diets.forEach((diet) => diets.add(diet))
      })
  
      // Ahora podemos guardar cada dieta en la base de datos
      for (const diet of diets) {
        await Diet.create({ name: diet })
      }
  
      // Agregar la dieta vegetarian a la base de datos
      await Diet.create({ name: 'vegetarian' });
  
      // Obtenemos todas las dietas de la base de datos
      const allDiets = await Diet.findAll()
  
      // Enviamos las dietas en la respuesta
      res.status(200).json(allDiets)
    } catch (error) {
      res
        .status(400)
        .send('Ocurrió un error al guardar las dietas en la base de datos')
    }
  }
  module.exports = { getDietsHandler }