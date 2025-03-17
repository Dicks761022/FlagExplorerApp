import { render, screen, fireEvent } from '@testing-library/react';
import CountryCard from './CountryCard';

describe('CountryCard Component', () => {
  const mockCountry = { name: 'Canada', flag: 'https://flag.url' };
  const mockOnClick = jest.fn();

  test('renders country flag and name', () => {
    render(<CountryCard country={mockCountry} onClick={mockOnClick} />);

    // Check if the flag image is rendered
    const flagImg = screen.getByAltText(/Flag of Canada/i);
    expect(flagImg).toBeInTheDocument();

    // Check if the image has the correct src
    expect(flagImg).toHaveAttribute('src', mockCountry.flag);
  });

  test('calls onClick when the card is clicked', () => {
    render(<CountryCard country={mockCountry} onClick={mockOnClick} />);

    // Simulate a click on the country card
    fireEvent.click(screen.getByAltText(/Flag of Canada/i));

    // Verify that the onClick function is called
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
