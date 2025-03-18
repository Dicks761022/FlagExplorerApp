import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Home from '../pages/Home';
import "@testing-library/jest-dom/vitest"

// Mock fetch response
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { name: 'France', region: 'Europe', flag: 'france.png' },
      { name: 'Brazil', region: 'Americas', flag: 'brazil.png' }
    ]),
  })
);

describe('Home Component', () => {
  it('displays loading message initially', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading countries/i)).toBeInTheDocument();
  });

  
  it('shows an error message if fetch fails', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/error: network error/i)).toBeInTheDocument();
    });
  });
});
