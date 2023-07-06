import {
  GET_ALL_RECIPES,
  GET_SEARCH_RECIPES,
  ORDER_ALPHA,
  GET_ALL_DIETS,
  ORIGIN_FILTER,
  DIET_FILTER,
  GET_DETAIL_RECIPE,
  GET_DETAIL_RECIPE_ID,
} from './actions'

const initialState = {
  allRecipes: [],
  temporal: [],
  diets: [],
  detailRecipe: undefined,
  detailRecipeId: undefined,
}

const rootReducer = (state = initialState, { type, payload }) => {
  //funcion para utilizar 'sort'
  const sort_list = (key, list, inverse) =>
    inverse
      ? [...list].sort((b, a) =>
          a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0
        )
      : [...list].sort((a, b) =>
          a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0
        )

  switch (type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        allRecipes: payload,
        temporal: payload,
      }

    case GET_ALL_DIETS:
      return {
        ...state,
        diets: payload,
      }

    case GET_SEARCH_RECIPES:
      const filterName = state.allRecipes.filter((element) =>
        element.name.toLowerCase().includes(payload.toLowerCase())
      )

      return {
        ...state,
        temporal: filterName.length === 0 ? ['not found'] : filterName,
      }

    case ORDER_ALPHA:
      if (payload === 'asc') {
        return {
          ...state,
          temporal: sort_list('name', state.temporal),
        }
      } else {
        return {
          ...state,
          temporal: sort_list('name', state.temporal, true),
        }
      } // Agrega esta llave de cierre para cerrar el caso ORDER_ALPHA

    case GET_DETAIL_RECIPE:
      return {
        ...state,
        detailRecipe: payload === undefined ? undefined : payload[0],
      }

    case DIET_FILTER:
      if (payload === 'all') {
        return {
          ...state,
          temporal: state.allRecipes,
        }
      }
      return {
        ...state,
        temporal: state.allRecipes.filter((recipe) => {
          const diets = recipe.Diets
          if (Array.isArray(diets)) {
            const dietNames = diets.map((diet) =>
              typeof diet === 'string'
                ? diet.toLowerCase()
                : diet.name.toLowerCase()
            )
            return dietNames.includes(payload.toLowerCase())
          }
          return false
        }),
      }

    case ORIGIN_FILTER:
      if (payload === 'all') {
        return {
          ...state,
          temporal: state.allRecipes,
          originFilter: 'all',
        }
      } else if (payload === 'api') {
        return {
          ...state,
          temporal: state.allRecipes.filter((recipe) => !recipe.created),
          originFilter: 'api',
        }
      } else {
        return {
          ...state,
          temporal: state.allRecipes.filter((recipe) => recipe.created),
          originFilter: 'database',
        }
      }

    case GET_DETAIL_RECIPE_ID:
      return {
        ...state,
        detailRecipeId: payload,
      }

    default:
      return { ...state }
  }
}

export default rootReducer
