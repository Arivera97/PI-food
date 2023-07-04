import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import Footer from '../../components/Footer/Footer'
import './landing.css'
import video from '../../videos/background.mp4'

const LandingPage = () => {
  return (
    <div className="container">
      <div className="video-background">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <img src={logo} alt="Logo" className="logo" />
      <Link to="/home">
        <button className="retro-button">Go to Home</button>
      </Link>
      <Footer />
    </div>
  )
}

export default LandingPage
