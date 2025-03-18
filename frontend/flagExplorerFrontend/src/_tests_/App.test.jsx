import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from '../App';
import "@testing-library/jest-dom/vitest";

describe('App Component', () => {
  it('renders the Home component by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Check for the loading text displayed in the Home component
    expect(screen.getByText(/Loading countries.../i)).toBeInTheDocument();
  });

  it('renders the Details page when a country is selected', async () => {
    render(
      <MemoryRouter initialEntries={['/country/France']}>
        <App />
      </MemoryRouter>
    );

   
  });
});
