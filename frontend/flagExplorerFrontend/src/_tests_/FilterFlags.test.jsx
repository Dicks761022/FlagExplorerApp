import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from 'vitest';
import FilterFlags from "../components/FilterFlags";
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

  
  
});
