import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getSearchRecipes, getAllRecipes } from '../../redux/actions'
import './search.css'

const Search = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSearch = () => {
    dispatch(getSearchRecipes(input))
  }

  const handleReset = () => {
    setInput('')
    dispatch(getAllRecipes())
  }

  return (
    <div className="searchbar-div">
      <input
        className="bar-btn"
        placeholder="Busca una receta..."
        value={input}
        onChange={handleInputChange}
      />
      <button className="btn-search" onClick={handleSearch}>
        Search
      </button>
      <button className="btn-reset" onClick={handleReset}>
        Delate
      </button>
    </div>
  )
}

export default Search
