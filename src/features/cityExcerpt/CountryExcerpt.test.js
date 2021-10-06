/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
// import * as reactRedux from 'react-redux';
// import { useDispatch } from 'react-redux'; 
import { BrowserRouter as Router } from 'react-router-dom';

import CountryExcerpt from './CountryExcerpt';

const selectorObj = {
  name: 'london',
};

const mockDispatch = jest.fn();
// const mockedDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((selector) => selector({ selectorObj })),
  useDispatch: () => mockDispatch,
}));

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const testObj = {
  name: 'london',
  temp: 20,
  main: 'clouds',
};

it('renders with single City', () => {
  act(() => {
    render(<Router><CountryExcerpt countryId={testObj} /></Router>, container);
  });
  expect(container.textContent).toBe('londonclouds20°Cdetailed infoupdatedelete');
});
