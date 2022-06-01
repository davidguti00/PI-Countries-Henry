
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getDetails, continentFilter } from "../actions";
import { Link } from "react-router-dom";
import Cards from "./Cards";

export default function Home() {
  const dispatch = useDispatch()
  const allCountries = useSelector(state => state.allCountries) //mapStateToProps
  //repetir los estados...arriba
  
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState("ASC")
  const [continent, setContient] = useState()
  console.log(allCountries)

  useEffect(() => {
    dispatch(getCountries()) //mapDispatchToProps
  },[dispatch])

  useEffect((order, continent) => {
    dispatch(continentFilter(order, continent)) //mapDispatchToProps
  },[dispatch])

  const handleClick = ((e) => {
    e.preventDefault();
    dispatch(getCountries());
  })

  const prev = (e) => {
    e.preventDefault();
    if(page <= 0) {
      setPage(0);
    } else {
      setPage(page - 10)
    }
  }

  const next = (e) => {
    e.preventDefault();
    if(allCountries.length - 10) {
      return;
    } else {
      setPage(page + 10)
    }
  }

  const orderAlph = (e) => {
    e.preventDefault();
    setOrder(e.target.value);
  }


  const detalle = (e) => {
    e.preventDefault();
    getDetails(e.id)
  }

  return(
    <div>
      <Link to="/">LP</Link>
      <h1>HOME</h1>
      <button onClick={e => handleClick(e)}>
        Boton
      </button>
      <div>
        <select onChange={(e) => orderAlph(e)}>
          <option>Alphabetic</option>
          <option value="ASC">A-Z</option>
          <option value="DESC">Z-A</option>
        </select>
        <select onChange>
          <option>Population</option>
          <option value="ASC">0-N</option>
          <option value="DESC">N-0</option>
        </select>
        <select>
          <option>Continent</option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <div>
          {

            allCountries && allCountries.map(e => {
              console.log(e.img);
              return(
                <fragment>
                  <Link to={`/home/${e.id}`}>
                    <Cards 
                    name={e.name} 
                    continent={e.continent} 
                    img={e.image} 
                    population={e.population} 
                    key={e.id}/>
                    <button onClick={detalle}></button>
                  </Link>
                </fragment>
              )
            })
          }
        </div>
    </div>
      <button onClick={(e) => {prev(e)}} disabled={page <= 0}>PREV</button>
      <button onClick={(e) => {next(e)}} disabled={page >= 240}>NEXT</button>
    </div>
  )
}