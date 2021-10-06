/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';

import CountriesList from './CountriesList';

const selectorObj = {
  name: 'london',
  temp: 20,
  main: 'clouds',
  id: 4444,
};

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((selector) => selector({ selectorObj })),
  useDispatch: () => mockDispatch,
}));

let container = {
  status: 'idle',
};
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders all cities', () => {
  act(() => {
    render(<Router><CountriesList /></Router>, container);
  });
  expect(container.textContent).toBe('londonclouds20°Cdetailed infoupdatedelete');
});
