import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  test('renders navbar', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('My Lists')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('renders home page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Welcome to List Creator')).toBeInTheDocument();
  });

  test('renders list page on /list route', () => {
    render(
      <MemoryRouter initialEntries={['/list']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('My List Creator')).toBeInTheDocument();
  });

  test('renders about page on /about route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('About List Creator')).toBeInTheDocument();
  });
});