import { render, screen } from '@testing-library/react';
import CountryDetails from './CountryDetails';

describe('CountryDetails Component', () => {
  const mockCountry = {
    name: 'Canada',
    population: 37742154,
    capital: 'Ottawa',
    flag: 'https://flag.url'
  };

  test('renders country details correctly', () => {
    render(<CountryDetails country={mockCountry} />);

    // Check if the country name is rendered
    expect(screen.getByText(mockCountry.name)).toBeInTheDocument();

    // Check if the population is rendered and formatted with commas
    expect(screen.getByText(`Population: ${mockCountry.population.toLocaleString()}`)).toBeInTheDocument();

    // Check if the capital is rendered
    expect(screen.getByText(`Capital: ${mockCountry.capital}`)).toBeInTheDocument();

    // Check if the flag image is rendered
    const flagImg = screen.getByAltText(mockCountry.name);
    expect(flagImg).toBeInTheDocument();
    expect(flagImg).toHaveAttribute('src', mockCountry.flag);
  });

  test('renders empty div when no country is passed', () => {
    render(<CountryDetails country={null} />);

    // The component should render an empty div if no country is passed
    expect(screen.queryByText(/Country Details/i)).toBeNull();
    expect(screen.container.firstChild).toBeEmptyDOMElement();
  });
});
