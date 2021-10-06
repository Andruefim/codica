import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from '../features/citiesSlice/countriesSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    countries: countriesReducer,
  },
});

// export default { store };
