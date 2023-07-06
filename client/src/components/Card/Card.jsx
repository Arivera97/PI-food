import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

const Card = ({ name, heart_score, id, imagen, diets, dietsDB }) => {
  if (!name || !heart_score || !id || !imagen) {
    return null
  }

  const dietsString = diets?.join(', ')
  const dietsString2 = dietsDB?.filter((item) => item !== undefined)?.join(', ')
  const containsObjectString =
    dietsString && dietsString.includes('[object Object]')

  console.log(dietsDB)
  return (
    <div className="card">
      <h3 className="card-title">{name}</h3>
      <img src={imagen} alt="Recetas" />
      <p>❤️{heart_score}</p>
      {containsObjectString ? (
        <p className="hidden">Diets not available</p>
      ) : (
        <p>{dietsString}</p>
      )}
      {dietsString2 && <p>{dietsString2}</p>}
      <div className="div-button">
        {id && (
          <Link to={`/detail/${id}`}>
            <button className="Link">View Recipe</button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Card
