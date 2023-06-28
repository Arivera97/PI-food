const getRecipesHandler = (req, res) => {
    res.send("Esta ruta obtiene el detalle de una receta específica");
};
const getRecipeHandler = (req, res) => {
    res.send("Obtener todas aquellas recetas que coincidan con el nombre");
};
const createRecipesHandler = (req, res) => {
    res.send("Esta ruta para crear una nueva receta");
};

module.exports= {
    getRecipesHandler,
    getRecipeHandler,
    createRecipesHandler,
};