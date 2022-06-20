import React from 'react'
import classes from './Country.module.css'
import {Link} from "react-router-dom";


const Country = (props) => {


  return (
    <div className={classes.country} >
      <Link
        to={`/${props.country.name.common.toLowerCase().replace(/\s/g, "%20")}`}
        key={props.country.name.common}
        className={classes.link}
      >
      <img src={props.country.flags.png} alt="" />

      <div className={classes.content}>
      <h1>{props.country.name.common}</h1>
      <p> Poulation: <span>{props.country.population}</span> </p>
      <p> Region: <span>{props.country.region}</span></p>
      <p> Capital: <span>{props.country.capital}</span></p>
      </div>
      </Link>
    </div>
  )
}

export default Country