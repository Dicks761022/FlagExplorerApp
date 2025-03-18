import React from 'react';
import { render,screen,fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from 'vitest';
import FilterFlags from "../components/FilterFlags"
import "@testing-library/jest-dom/vitest";

describe('FilterFlags Component', () => {
 
  it('renders dropdown with region options', () => {
    render(<FilterFlags onSelect={() => {}} />);

    // Check if the default value is rendered correctly
    expect(screen.getByText('Filter by region')).toBeInTheDocument();

    // Check if region options are rendered
    expect(screen.getByText('Africa')).toBeInTheDocument();
    expect(screen.getByText('Asia')).toBeInTheDocument();
    expect(screen.getByText('Europe')).toBeInTheDocument();
    expect(screen.getByText('North America')).toBeInTheDocument();
    expect(screen.getByText('South America')).toBeInTheDocument();
  });

  it('calls onSelect when a region is selected', () => {
    const mockOnSelect = vi.fn(); 
    render(<FilterFlags onSelect={mockOnSelect} />);

    // Select a region (e.g., Africa)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Africa' } });

    // Verify that the onSelect function is called with the selected region
    expect(mockOnSelect).toHaveBeenCalledWith('Africa');
  });

  it('calls onSelect with "all" when "Filter by region" is selected', () => {
    const mockOnSelect = vi.fn();
    render(<FilterFlags onSelect={mockOnSelect} />);

    // Select the "Filter by region" option (default option)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'all' } });

    // Verify that the onSelect function is called with 'all'
    expect(mockOnSelect).toHaveBeenCalledWith('all');
  });
});
