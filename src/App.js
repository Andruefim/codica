/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import SingleCountryPage from './features/singleCityPage/SingleCountryPage';
import CountriesList from './features/citiesPage/CountriesList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={CountriesList} />
        <Route path="/countries/:countryId" component={SingleCountryPage} />
      </div>
    </Router>
  );
}

export default App;
