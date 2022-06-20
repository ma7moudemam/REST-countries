import React ,{useEffect, useState} from "react";
import { Fragment } from "react";
import classes from "./Countries.module.css";
import Country from "./Country";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [selectRegion, setSelectRegion] = useState("world");
  const [isRegion, setIsRegion] = useState(false);
  const [search, setSearch] = useState("");


  async function fetchCountries() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
  }

  async function fetchRegion(region) {
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${region}`
    );
    const data = await response.json();
    return data;
  }

  async function fetchSearch(search) {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${search}`
    );
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    fetchCountries().then((data) => setCountries(data.slice(0, 20)));
    setTimeout(() => {
      setIsLoding(true);
    }
    , 2000);
  }, []);

  useEffect(() => {
    if (selectRegion !== "world") {
      setIsRegion(true);
      fetchRegion(selectRegion).then((data) => setCountries(data.slice(0, 20)));
    } else {
      setIsRegion(false);
      fetchCountries().then((data) => setCountries(data.slice(0, 20)));
    }
  }, [selectRegion]);

  useEffect(() => {
    if (search !== "") {
      setIsRegion(false);
      fetchSearch(search).then((data) => setCountries(data.slice(0, 20)));
    } else {
      setIsRegion(false);
      fetchCountries().then((data) => setCountries(data.slice(0, 20)));
    }
  }, [search]);


  const loadmoreHandler = () => {
    fetchCountries().then((data) => setCountries(data.slice(0, countries.length + 20)));
  }

  const regionHandler = (event) => {
    setSelectRegion(event.target.value);
  }

  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
  }

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.filter}>
          <input type="text" placeholder="Search for a country ...." onChange={searchChangeHandler} value={search}/>
          <select id="region" onChange={regionHandler}>
            <option value="" selected disabled hidden>
              Filter by Region
            </option>
            <option value="world">World</option>
            <option value="africa">Africa</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
            <option value="americas">Americas</option>
            <option value="antarctic">Antarctic</option>
          </select>
        </div>

        {isLoding ? (
          <div className={classes.countries}>
            {
              countries.length > 0 ? countries.map((country) => (
                <Country key={country.alpha3Code} country={country} />
              ))
              :
              <h1 className={classes.error}>No Countries Found</h1>
            }
          </div>
        ) : (
          <h1 className={classes.loading}>Loading...</h1>
        )}
        <button onClick={loadmoreHandler} className={classes.laodBtn}>Load More...</button>
      </div>
    </Fragment>
  );
};

export default Countries;
