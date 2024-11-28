import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App Component', () => {
  beforeEach(() => {
    render(<MemoryRouter><App /></MemoryRouter>);
  });

  test('renders welcome message', () => {
    expect(screen.getByText('Welcome to List Creator')).toBeInTheDocument();
  });

  test('renders description text', () => {
    expect(screen.getByText('Create and manage your lists easily!')).toBeInTheDocument();
  });
}); 