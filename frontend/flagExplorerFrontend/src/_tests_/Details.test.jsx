import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi,beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from '../pages/Details';

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

// Mock fetch
global.fetch = vi.fn();

const mockCountry = {
  name: 'France',
  population: 67390000,
  capital: 'Paris',
  flag: 'https://flagcdn.com/fr.svg',
};

describe('Details Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches and displays country details', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockCountry),
    });

    render(
      <MemoryRouter initialEntries={['/country/France']}>
        <Routes>
          <Route path="/country/:name" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('France')).toBeInTheDocument();
      expect(screen.getByText('Population: 67,390,000')).toBeInTheDocument();
      expect(screen.getByText('Capital: Paris')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'France' })).toBeInTheDocument();
    });
  });

  it('shows an error message if the country is not found', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(
      <MemoryRouter initialEntries={['/country/Unknown']}>
        <Routes>
          <Route path="/country/:name" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/error: country not found/i)).toBeInTheDocument();
    });
  });

  it('navigates back when the back button is clicked', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockCountry),
    });

    render(
      <MemoryRouter initialEntries={['/country/France']}>
        <Routes>
          <Route path="/country/:name" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('France'));

    fireEvent.click(screen.getByRole('button', { name: /back/i }));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
