import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from '../components/SearchBar';
import '@testing-library/jest-dom/vitest';

describe('SearchBar Component', () => {
  
  it('renders the search input field', () => {
    render(<SearchBar setSearchFlag={() => {}} />);

    // Check if the input field is in the document
    const inputElement = screen.getByPlaceholderText('Search for a country');
    expect(inputElement).toBeInTheDocument();
  });

  it('calls setSearchFlag when user types in the input field', () => {
    const mockSetSearchFlag = vi.fn(); // Mock function
    render(<SearchBar setSearchFlag={mockSetSearchFlag} />);

    // Get the input field
    const inputElement = screen.getByPlaceholderText('Search for a country');

    // Simulate typing in the input field
    fireEvent.change(inputElement, { target: { value: 'France' } });

    // Check if setSearchFlag was called with 'France'
    expect(mockSetSearchFlag).toHaveBeenCalledWith('France');
  });

  it('updates the input field when typing', () => {
    const mockSetSearchFlag = vi.fn();
    render(<SearchBar setSearchFlag={mockSetSearchFlag} />);

    const inputElement = screen.getByPlaceholderText('Search for a country');

    // Simulate user typing "Germany"
    fireEvent.change(inputElement, { target: { value: 'Germany' } });

    // Ensure the input field has the correct value
    expect(inputElement).toHaveValue('Germany');
  });

});
