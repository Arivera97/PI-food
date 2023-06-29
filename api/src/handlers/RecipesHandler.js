const {
  createRecipe,
  getRecipeById,
  getAllRecipes,
  searchRecipes,
} = require("../controllers/recipeController");

const getRecipesHandler = async (req, res) => {
  const { name } = req.query;
  // Aquí es para buscar recetas por su nombre
  const results = name ? await searchRecipes(name) : await getAllRecipes();
  res.status(200).json(results)
}


// Aquí es para obtener los detalles de la receta por su ID
const getRecipeHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";
  try {
    const recipe = await getRecipeById(id, source);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Aquí es para crear una nueva receta y relacionarla con los tipos de dieta indicados
const createRecipesHandler = async (req, res) => {
  const { id, name, summary, imagen, heart_score, steps } = req.body;
  try {
    const newRecipe = await createRecipe(
      id,
      name,
      summary,
      imagen,
      heart_score,
      steps
    );
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRecipeHandler,
  getRecipesHandler,
  createRecipesHandler,
};
