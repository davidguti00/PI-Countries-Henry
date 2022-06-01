import React from 'react'
import {Link} from 'react-router-dom'



const LandingPage = () => {
  return (
    <div>
        <h1>    Welcome to Country App </h1>
        <Link to = '/home/'>
            <button> Enter Site </button>
        </Link>
    </div>
  )
}

export default LandingPage