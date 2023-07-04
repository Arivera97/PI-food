import Search from '../Search/Search'
import './NavBar.css'
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import logo from '../../images/logo.png'

const NavBar = () => {
  const location = useLocation()

  return (
    <header>
      <nav className="container-nav">
        <Link to="/" className="nav-link">
          <img src={logo} alt="Logo" className="logo-nav" />
        </Link>
        <Link
          to="/home"
          className={
            location.pathname === '/home' ? 'nav-link active' : 'nav-link'
          }
        >
          HOME
        </Link>
        <Link
          to="/create"
          className={
            location.pathname === '/create' ? 'nav-link active' : 'nav-link'
          }
        >
          CREATE RECIPE
        </Link>
        <div className="search">
          <Search />
        </div>
      </nav>
    </header>
  )
}

export default NavBar
