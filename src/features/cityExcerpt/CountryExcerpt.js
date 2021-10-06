/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCountries,
  AllCountries,
  deleted,
} from '../citiesSlice/countriesSlice';

const CountryExcerpt = ({ countryId }) => {
  const countries = useSelector(AllCountries);
  const dispatch = useDispatch();
  const onDeleteClicked = () => {
    dispatch(deleted({ deleteById: countryId.id }));
    const deleteCities = countries.filter((country) => country.id !== countryId.id);
    const allCities = deleteCities.map((city) => city.name);
    console.log(`deleteCities: ${allCities}`);
    const serializedSearch = JSON.stringify(allCities);
    localStorage.setItem('cities', serializedSearch);
  };
  const onUpdateClicked = () => {
    dispatch(deleted({ deleteById: countryId.id }));
    dispatch(fetchCountries(countryId.name));
  };
  return (
    <article className="post-excerpt col-10 col-sm-5 col-lg-3 mx-2 mx-lg-3 bg-light" key={countryId.id}>
      <div className="link-excerpt h-100 pb-5 d-flex flex-column align-items-center">
        <div className="total-country mt-4">
          <h1>{countryId.name}</h1>
        </div>
        <div className="total-confirmed d-flex w-100 justify-content-between px-4 mt-4">
          <h3 className="px-3">{countryId.main}</h3>
          <h3>{`${countryId.temp}°C`}</h3>
        </div>
        <div className="d-flex flex-column container align-items-center">
          <Link
            style={{ textDecoration: 'none' }}
            to={`/countries/${countryId.id}`}
            className="btn border bg-secondary text-white mt-2 col-11"
          >
            <h6>detailed info</h6>
          </Link>
          <div className="d-flex justify-content-center col-12">
            <button type="button" className="btn-update btn btn-primary mt-2 w-50 mx-1" onClick={onUpdateClicked}>update</button>
            <button type="button" className="btn btn-danger mt-2 w-50 mx-1" onClick={onDeleteClicked}>delete</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CountryExcerpt;

CountryExcerpt.propTypes = {
  countryId: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    main: PropTypes.string.isRequired,
  }).isRequired,
};
