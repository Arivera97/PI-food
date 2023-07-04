import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

const Card = ({ name, heart_score, id, imagen, diets, dietsDB }) => {
  if (!name || !heart_score || !id || !imagen) {
    return null
  }

  const dietsString = diets?.join(', ')
  const isObjectString = dietsString === '[object Object]'

  return (
    <div className="card">
      <h3 className="card-title">{name}</h3>
      <img src={imagen} alt="Recetas" />
      <p>❤️{heart_score}</p>
      {isObjectString ? (
        <p className="hidden">{dietsString}</p>
      ) : (
        <p>{dietsString}</p>
      )}
      <p>{dietsDB}</p>
      <div className="div-button">
        {id && (
          <Link to={`/detail/${id}`}>
            <button className="Link">Ver Receta</button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Card
