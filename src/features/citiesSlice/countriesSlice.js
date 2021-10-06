/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  countries: [],
  hoursState: [],
  status: 'idle',
  hoursStatus: 'idle',
  error: null,
};

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async (countryName) => {
    const country = countryName;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=4dfb0c4c9d27781de183190eadde96b8`,
    );
    const result = await response.text();
    const obj = JSON.parse(result);
    const readyObj = {
      name: obj.name,
      main: obj.weather[0].main,
      description: obj.weather[0].description,
      temp: Math.floor(obj.main.temp - 273),
      temp_max: Math.floor(obj.main.temp_max - 273),
      temp_min: Math.floor(obj.main.temp_min - 273),
      id: obj.id,
      visibility: Math.floor(obj.visibility / 1000),
    };
    console.log(obj);
    return readyObj;
  },
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    deleted(state, action) {
      const { deleteById } = action.payload;
      state.countries = state.countries.filter((country) => country.id !== deleteById);
    },
    sortSearchUpdated(state, action) {
      const { search } = action.payload;
      if (search) {
        state.searchState = state.countries.filter((country) => country.Country
          .toLowerCase().includes(search.toLowerCase()));
        state.searchState.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
      } else {
        state.searchState = state.countries.filter((country) => country.Country
          .toLowerCase().includes(search.toLowerCase()));
        state.searchState.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = state.countries.concat(action.payload);
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  searchUpdated, sortSearchUpdated, sortUpdated, setStatus, deleted,
} = countriesSlice.actions;
export default countriesSlice.reducer;

export const AllCountries = (state) => state.countries.countries;
export const selectCountryById = (state, countryId) => state.countries.countries
  // eslint-disable-next-line eqeqeq
  .find((country) => country.id == countryId);
export const selectSearchedResults = (state) => state.countries.searchState;
export const countriesStatusSelector = (state) => state.countries.status;
