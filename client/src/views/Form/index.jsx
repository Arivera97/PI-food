import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postRecipe, getDiets } from '../../redux/actions'
import created from './created.png'
import './form.css'

const Form = () => {
  const dispatch = useDispatch()
  const [recipeData, setRecipeData] = useState({
    name: '',
    summary: '',
    imagen: '',
    heart_score: 0,
    steps: '',
    dietIds: [],
  })
  const diets = useSelector((state) => state.diets)
  const [errors, setErrors] = useState({})
  const [isRecipeCreated, setIsRecipeCreated] = useState(false)

  useEffect(() => {
    dispatch(getDiets())
  }, [dispatch])

  useEffect(() => {
    let timeout
    if (isRecipeCreated) {
      timeout = setTimeout(() => {
        setIsRecipeCreated(false)
      }, 5000)
    }
    return () => clearTimeout(timeout)
  }, [isRecipeCreated])

  const validateName = (name) => {
    const regex = /\d/
    if (regex.test(name)) {
      return 'El nombre no puede contener números'
    }
    return ''
  }

  const validateSummary = (summary) => {
    if (summary.length < 10) {
      return 'El resumen debe tener al menos 10 caracteres'
    }
    return ''
  }

  const validateSteps = (steps) => {
    if (steps.length < 15) {
      return 'Los pasos deben tener al menos 15 caracteres'
    }
    return ''
  }

  const validateImage = (imageUrl) => {
    if (imageUrl.length < 10) {
      return 'La URL de la imagen debe tener al menos 10 caracteres'
    }
    return ''
  }
  const validateHeartScore = (heartScore) => {
    if (!Number.isInteger(heartScore)) {
      return 'El puntaje de receta debe ser un número entero'
    }
    return ''
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target

    let error = ''
    if (name === 'name') {
      error = validateName(value)
    } else if (name === 'summary') {
      error = validateSummary(value)
    } else if (name === 'steps') {
      error = validateSteps(value)
    } else if (name === 'imagen') {
      error = validateImage(value)
    } else if (name === 'heart_score') {
      error = validateHeartScore(parseInt(value))
    }

    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }))
  }

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target
    setRecipeData((prevData) => {
      if (checked) {
        return {
          ...prevData,
          dietIds: [...prevData.dietIds, value],
        }
      } else {
        return {
          ...prevData,
          dietIds: prevData.dietIds.filter((id) => id !== value),
        }
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    let formIsValid = true
    let formErrors = {}

    if (validateName(recipeData.name)) {
      formIsValid = false
      formErrors.name = 'El nombre no puede contener números'
    }

    if (validateSummary(recipeData.summary)) {
      formIsValid = false
      formErrors.summary = 'El resumen debe tener al menos 10 caracteres'
    }

    if (validateSteps(recipeData.steps)) {
      formIsValid = false
      formErrors.steps = 'Los pasos deben tener al menos 3 caracteres'
    }
    if (recipeData.dietIds.length === 0) {
      formIsValid = false
      formErrors.dietIds = 'Debes seleccionar al menos una dieta'
    }

    if (!formIsValid) {
      setErrors(formErrors)
      return
    }
    try {
      await dispatch(postRecipe(recipeData))
      setIsRecipeCreated(true)
      setRecipeData({
        name: '',
        summary: '',
        imagen: '',
        heart_score: 0,
        steps: '',
        dietIds: [],
      })
    } catch (error) {
      setIsRecipeCreated(false)
    }
  }

  return (
    <div className="form-container">
      <div className="space-form"></div>
      <form onSubmit={handleSubmit} className="form">
        <h1 className="title-form">Crea tu Receta</h1>
        {isRecipeCreated && (
          <h1 className="alert-form">
            <img src={created} alt="Receta creada" className='img-created'/>
            Your recipe has been created successfully
          </h1>
        )}
        <label className="formLabel">
          <p className="Nameform">Name:</p>
          <input
            type="text"
            name="name"
            value={recipeData.name}
            onChange={handleInputChange}
          />
          {errors.name && <span>{errors.name}</span>}
        </label>
        <label className="formLabel">
          <p className="Nameform">Summary:</p>
          <textarea
            name="summary"
            value={recipeData.summary}
            onChange={handleInputChange}
          />
          {errors.summary && <span>{errors.summary}</span>}
        </label>
        <label className="formLabel">
          <p className="Nameform">Image URL:</p>
          <input
            type="text"
            name="imagen"
            value={recipeData.imagen}
            onChange={handleInputChange}
          />
          {errors.imagen && <span>{errors.imagen}</span>}
        </label>
        <label className="formLabel">
          <p className="Nameform">Heart Score:</p>
          <input
            type="number"
            name="heart_score"
            value={recipeData.heart_score}
            onChange={handleInputChange}
          />
          {errors.heart_score && <span>{errors.heart_score}</span>}
        </label>
        <label className="formLabel">
          <p className="Nameform">Steps:</p>
          <textarea
            name="steps"
            value={recipeData.steps}
            onChange={handleInputChange}
          />
          {errors.steps && <span>{errors.steps}</span>}
        </label>
        <p className="Nameform">Diets:</p>
        <div className="checkboxes">
          {diets.map((diet) => (
            <label key={diet.id} className="diet-label">
              <input
                type="checkbox"
                value={diet.id}
                checked={recipeData.dietIds.includes(diet.id)}
                onChange={handleCheckboxChange}
              />
              {diet.name}
            </label>
          ))}
          {errors.dietIds && <span>{errors.dietIds}</span>}
        </div>
        <br />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  )
}

export default Form
