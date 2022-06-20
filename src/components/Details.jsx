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
              <div className={classes.innerContent}>
              <p>Native Name: <span>{country.name?.nativeName ?Object.values(country.name?.nativeName)[0].common : country.name?.common}</span></p>
              <p>Population: <span>{country.population}</span></p>
              <p>Region: <span>{country.region}</span></p>
              <p>Capital: <span>{country.capital}</span></p>
              <p>Sub Region: <span>{country.subregion}</span></p> 
              <p>Top Level Domain: <span>{country.tld}</span></p>
              <p>Currencies: <span>{ country.currencies && Object.values(country.currencies)[0].name}</span></p>
              <p>Languages: <span>{country.languages && Object.values(country.languages).join(', ')}</span></p>
              </div>
              <div className={classes.border}>
                <p>Border Countries: </p>
                <ul>
                  {country.borders.map((border) => {
                    return  <Link className={classes.couBorder} to={`/`} key={border}>{border}</Link>
                  }
                  )}
                </ul>
              </div>
             
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
