import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { HelloWorld } from '../components/HelloWorld';

describe('HelloWorld', () => {
  it('renders the default greeting', () => {
    render(<HelloWorld />);
    expect(screen.getByTestId('hello-world-text')).toBeTruthy();
    expect(screen.getByText('Hello, World! 👋')).toBeTruthy();
  });

  it('renders a custom name', () => {
    render(<HelloWorld name="Alice" />);
    expect(screen.getByText('Hello, Alice! 👋')).toBeTruthy();
  });

  it('renders another custom name', () => {
    render(<HelloWorld name="TestFlight Tester" />);
    expect(screen.getByText('Hello, TestFlight Tester! 👋')).toBeTruthy();
  });

  it('renders the container', () => {
    render(<HelloWorld />);
    expect(screen.getByTestId('hello-world-container')).toBeTruthy();
  });
});
