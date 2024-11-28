import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListCreator from '../components/ListCreator';

describe('ListCreator Component', () => {
  beforeEach(() => {
    render(<ListCreator />);
  });

  test('renders list creator heading', () => {
    expect(screen.getByText('My List Creator')).toBeInTheDocument();
  });

  test('renders input field and button', () => {
    expect(screen.getByPlaceholderText('Enter an item...')).toBeInTheDocument();
    expect(screen.getByText('Add Item')).toBeInTheDocument();
  });

  test('can add new items to the list', () => {
    const input = screen.getByPlaceholderText('Enter an item...');
    const button = screen.getByText('Add Item');

    fireEvent.change(input, { target: { value: 'Test Item' } });
    fireEvent.click(button);

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(input.value).toBe(''); // Input should be cleared after adding
  });

  test('does not add empty items', () => {
    const button = screen.getByText('Add Item');
    const initialItems = screen.queryAllByRole('listitem').length;

    fireEvent.click(button);

    expect(screen.queryAllByRole('listitem')).toHaveLength(initialItems);
  });
}); 