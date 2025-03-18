import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Component', () => {
  it('renders the Home component by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading countries/i)).toBeInTheDocument();
  });

  it('renders the Details page when a country is selected', () => {
    render(
      <MemoryRouter initialEntries={['/country/France']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/country details/i)).toBeInTheDocument();
  });
});
