import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders 3 list items', () => {
  render(<App />);
  const listItems = screen.getAllByRole("listitem");
  expect(listItems.length).toBe(3)
});

test('test title', () => {
  render(<App />);
  const title = screen.getByTestId('mytesti')
  expect(title).toBeInTheDocument()
})

test('sum should show 3', () => {
  render(<App />);
  const sum = screen.getByTitle('sum')
  expect(sum.textContent).toEqual("3")
})
