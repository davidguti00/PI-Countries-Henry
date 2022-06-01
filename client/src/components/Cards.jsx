import React from 'react'
import { Link } from 'react-router-dom'

export default function Cards({name, continent, population, img, id}) {
// const displayName = name.slice(0,25)

    return (
    
        <Link to= {'/home/' + id}>
    
        <div className="cards">
            <h4>{name}</h4>
            <h6>{continent}</h6>
            <h6>Population {population}</h6>
            <img src={img} alt="No flag to display" width="180px" height="100px"/>
        </div>

        </Link>

    )
}


