import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../Card/Card'
import './CardsContainer.css'
import {
  getDiets,
  getAllRecipes,
  orderByAlphabetical,
  filterByDiet,
  originFilter, // Importar la acción de filtro por origen
} from '../../redux/actions'

const CardsContainer = () => {
  const allRecipes = useSelector((state) => state.allRecipes)
  const filteredRecipes = useSelector((state) => state.temporal)
  const diets = useSelector((state) => state.diets)
  const originFilterValue = useSelector((state) => state.originFilter) // Obtener el valor del filtro de origen
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [order, setOrder] = useState('asc')
  const [selectedDiet, setSelectedDiet] = useState('all')
  const [selectedOrigin, setSelectedOrigin] = useState('all') // Estado para el origen seleccionado
  const recipesPerPage = 9

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

  const indexOfLastRecipe = currentPage * recipesPerPage
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  )

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const nextPage = () => {
    setCurrentPage(currentPage + 1)
    setOrder('asc')
  }
  const prevPage = () => {
    setCurrentPage(currentPage - 1)
    setOrder('asc')
  }

  const handleOrderByAlphabetical = () => {
    const newOrder = order === 'asc' ? 'desc' : 'asc'
    dispatch(orderByAlphabetical(newOrder))
    setOrder(newOrder)
  }

  const handleFilterByDiet = (diet) => {
    setSelectedDiet(diet)
    dispatch(filterByDiet(diet))
  }

  const handleFilterByOrigin = (origin) => {
    setSelectedOrigin(origin)
    dispatch(originFilter(origin)) // Dispatch de la acción de filtro por origen
  }

  return (
    <>
      <h1 className="title-home">Visit our Recipes</h1>
      <br />
      <div className="select-container">
        <div className="order-select">
          <select value={order} onChange={handleOrderByAlphabetical}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>

        <div className="filter-select">
          <select
            value={selectedDiet}
            onChange={(e) => handleFilterByDiet(e.target.value)}
          >
            <option value="all">All Diets</option>
            {diets.map((diet) => (
              <option key={diet.name} value={diet.name}>
                {diet.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-select">
          <select
            value={selectedOrigin}
            onChange={(e) => handleFilterByOrigin(e.target.value)}
          >
            <option value="all">All Origins</option>
            <option value="api">API</option>
            <option value="database">Database</option>
          </select>
        </div>
      </div>

      {currentRecipes.length === 0 ? (
        <div className="not-found">
          <img src={require('../../images/cebolla.png').default} alt="Error" />
          <h1>No existen recetas con tu solicitud... :(</h1>
        </div>
      ) : (
        <>
          <div className="card-container">
            {currentRecipes
              .slice()
              .sort((a, b) =>
                order === 'asc'
                  ? a.name.localeCompare(b.name)
                  : b.name.localeCompare(a.name)
              )
              .map((recipe) => (
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

          <div className="pagination">
            <button disabled={currentPage === 1} onClick={prevPage}>
              Previous
            </button>
            {filteredRecipes.length > recipesPerPage && (
              <>
                {Array.from(
                  {
                    length: Math.ceil(filteredRecipes.length / recipesPerPage),
                  },
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={currentPage === index + 1 ? 'active' : ''}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </>
            )}
            <button onClick={nextPage}>Next</button>
          </div>
        </>
      )}
    </>
  )
}

export default CardsContainer
