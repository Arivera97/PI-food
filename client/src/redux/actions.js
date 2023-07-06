import axios from 'axios'

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES'
export const GET_SEARCH_RECIPES = 'GET_SEARCH_RECIPES'
export const ORDER_ALPHA = 'ORDER_ALPHA'
export const GET_ALL_DIETS = 'GET_ALL_DIETS'
export const ORIGIN_FILTER = 'ORIGIN_FILTER'
export const DIET_FILTER = 'DIET_FILTER'
export const POST_RECIPE = 'POST_RECIPE'
export const GET_DETAIL_RECIPE = 'GET_DETAIL_RECIPE'
export const GET_DETAIL_RECIPE_ID = 'GET_DETAIL_RECIPE_ID'

const URL_API = 'http://localhost:3001'

export function getAllRecipes(loading) {
  const urlAllRecipes = `${URL_API}/recipes`
  return async function (dispatch) {
    if (!loading) {
      try {
        const response = await axios.get(urlAllRecipes)
        dispatch({ type: GET_ALL_RECIPES, payload: response.data })
      } catch (error) {
        console.error(error)
        dispatch({ type: GET_ALL_RECIPES, payload: [] })
      }
    } else {
      dispatch({ type: GET_ALL_RECIPES, payload: [] })
    }
  }
}

export function getDiets() {
  const urlAllDiets = `${URL_API}/diets`
  return async function (dispatch) {
    try {
      const response = await axios.get(urlAllDiets)
      dispatch({ type: GET_ALL_DIETS, payload: response.data })
    } catch (error) {
      console.error(error)
      dispatch({ type: GET_ALL_DIETS, payload: [] })
    }
  }
}

export function getSearchRecipes(name) {
  return {
    type: GET_SEARCH_RECIPES,
    payload: name,
  }
}

export function getDetailRecipe(name) {
  const urlDetail = `${URL_API}/recipes?name=${name}`
  return async function (dispatch) {
    if (name) {
      try {
        const response = await axios.get(urlDetail)
        dispatch({ type: GET_DETAIL_RECIPE, payload: response.data })
      } catch (error) {
        dispatch({ type: GET_DETAIL_RECIPE, payload: null })
      }
    } else {
      dispatch({ type: GET_DETAIL_RECIPE })
    }
  }
}

export function getDetailRecipeId(id) {
  const urlDetailRecipe = `${URL_API}/recipes/${id}`
  return async function (dispatch) {
    try {
      const response = await axios.get(urlDetailRecipe)
      dispatch({ type: GET_DETAIL_RECIPE_ID, payload: response.data })
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_DETAIL_RECIPE_ID, payload: null })
    }
  }
}

export function orderByAlphabetical(order) {
  return {
    type: ORDER_ALPHA,
    payload: order,
  }
}

export function filterByDiet(diet) {
  return {
    type: DIET_FILTER,
    payload: diet,
  }
}

export function originFilter(origin) {
  return {
    type: ORIGIN_FILTER,
    payload: origin,
  }
}

export function postRecipe(data) {
  return async function () {
    try {
      const response = await axios.post(`${URL_API}/recipes`, data)
      console.log(response)
      return response
    } catch (error) {
      console.error(error)
    }
  }
}
