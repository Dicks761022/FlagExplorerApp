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



});
