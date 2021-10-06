// /* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCountries,
  AllCountries,
  countriesStatusSelector,
} from '../citiesSlice/countriesSlice';

import CountryExcerpt from '../cityExcerpt/CountryExcerpt';

import logo from '../../images/logo.png';
import searchImg from '../../images/search.png';

const CountriesList = () => {
  const countriesStatus = useSelector(countriesStatusSelector);
  const countries = useSelector(AllCountries);

  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const onSearchChanged = (e) => setSearch(e.target.value);

  const onSearchClicked = () => {
    if (search) {
      dispatch(fetchCountries(search));
      const allCities = countries.map((city) => city.name);
      const fullCities = [...allCities, search];
      const serializedSearch = JSON.stringify(fullCities);
      localStorage.setItem('cities', serializedSearch);
    } else {
      console.log('no entries');
    }
  };
  const onLogoClicked = () => {
    setSearch('');
  };

  useEffect(() => {
    const serializedSearch = localStorage.getItem('cities');
    const initialCities = JSON.parse(serializedSearch);
    console.log(initialCities);
    if (countriesStatus === 'idle') {
      initialCities.forEach((city) => dispatch(fetchCountries(city)));
    }
  }, [countriesStatus, dispatch]);
  const renderedCountries = countries
    .map((country) => <CountryExcerpt key={country.id} countryId={country} />);

  return (
    <>
      <section className="countries-list">
        <div className="header row">
          <button onClick={onLogoClicked} type="button" className="logo-container btn shadow-none d-flex col-5 col-md-4">
            <div className="logo">
              <img className="logo-img" src={logo} alt="logo" />
            </div>
            <div className="statistic d-flex align-items-stretch mt-2 mx-3"><h1>Weather</h1></div>
          </button>
          <div className="search-container col-5 col-md-4 col-lg-3">
            <input
              className="searchInput"
              style={{ border: 'none', outline: 'none' }}
              type="text"
              id="searchValue"
              name="searchValue"
              placeholder="Add city..."
              value={search}
              onChange={onSearchChanged}
            />
            <button
              style={{ backgroundColor: 'white', border: 'none' }}
              type="button"
              onClick={onSearchClicked}
            >
              <img className="search-Img" alt="search" src={searchImg} />
            </button>
          </div>
        </div>
        <article
          className="d-flex mb-4 align-items-center bg-primary py-2 px-5 rounded-3"
        >
          <div className="link-excerpt text-white">
            <div>
              <h3>Your cities</h3>
            </div>
          </div>
        </article>
        <div className="row justify-content-center">
          {renderedCountries}
        </div>
      </section>
    </>
  );
};

export default CountriesList;
