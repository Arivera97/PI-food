import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../Card/Card'
import './CardsContainer.css'
import { getDiets, getAllRecipes } from '../../redux/actions'

const CardsContainer = () => {
  const allRecipes = useSelector((state) => state.allRecipes)
  const filteredRecipes = useSelector((state) => state.temporal)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDiets())
    dispatch(getAllRecipes())
  }, [dispatch])

  if (allRecipes.length === 0) {
    return (
      <div className="loading">
        <h1>Cargando...</h1>
      </div>
    )
  }

  return (
    <>
      <h1 className="title-home">Visit our Recipes</h1>

      {filteredRecipes[0] === 'not found' ? (
        <div className="not-found">
          <img src={require('../../images/cebolla.png').default} alt="Error" />
          <h1>No existen recetas con tu solicitud... : ( </h1>
        </div>
      ) : (
        <div className="card-container">
          {filteredRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
              imagen={recipe.imagen}
              summary={recipe.summary}
              heart_score={recipe.heart_score}
              steps={recipe.steps}
              diets={recipe?.Diets}
              dietsDB={recipe?.Diets?.map((diet) => diet.name)}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default CardsContainer
