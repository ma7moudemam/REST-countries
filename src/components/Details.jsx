import React, { useEffect, useState } from "react";
import classes from "./Details.module.css";
import { Link, useParams } from "react-router-dom";

const Details = () => {
  const [country, setCountry] = useState([]);

  const name = useParams();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name.country}`
        
      );
      const data = await response.json();
      setCountry(data);
      
    }

    fetchData();
  
  }, [name]);

  console.log(country[0]);

  return (
    <div className={classes.details}>
      <Link to={`/`}>
      <span>&larr;</span> Back
      </Link>
     {
      country.map((country) => {
        return (
          <div className={classes.countrydetails} key={country.name.common}>
              <div className={classes.imgContiner}>
              <img src={country.flags.png} alt="" />
              </div>
            <div className={classes.content}>
              <h1>{country.name.common}</h1>
              <p>Native Name: <span>{country.name?.nativeName ?Object.values(country.name?.nativeName)[0].common : country.name?.common}</span></p>
              <p>Population: <span>{country.population}</span></p>
              <p>Region: <span>{country.region}</span></p>
              <p>Capital: <span>{country.capital}</span></p>
            </div>
          </div>
        );
     }
      )
      }
    </div>
  );
};

export default Details;
