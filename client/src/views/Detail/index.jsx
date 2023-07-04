import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDetailRecipeId } from '../../redux/actions'
import './detail.css'

const DetailPage = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const detailRecipeId = useSelector((state) => state.detailRecipeId)

  useEffect(() => {
    dispatch(getDetailRecipeId(id))
  }, [dispatch, id])

  return (
    <div>
      {detailRecipeId && (
        <div className="body-detail">
          <div className="container-detail">
            <div className="title-detail">
              <h2>{detailRecipeId.name}</h2>
              <div className="image-detail">
                <img src={detailRecipeId.imagen} alt="Recipe" />
              </div>
            </div>
            <div className="resumen-detail">
              <h3>Resumen:</h3>
              <p>{detailRecipeId.summary.replace(/<\/?[^>]+(>|$)/g, '')}</p>
            </div>
            <div className="diets-detail">
              <h3>Dietas Asociadas:</h3>
              <p>{detailRecipeId.diets.join(', ')}</p>
            </div>
            <div className="step-detail">
              <h3>Paso a paso:</h3>
              <p>{detailRecipeId.steps}</p>
            </div>
            <div className="hearth-score">
              <h3>Puntaje de salud:</h3>
              <p>⭐{detailRecipeId.heart_score}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailPage
