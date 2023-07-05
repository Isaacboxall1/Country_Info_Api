import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { expect, jest, test } from "@jest/globals";

test("Renders Where In the World? in the title", async () => {
  render(<App />);
  const title = await screen.findByText(/Where In the World?/i);
  expect(title).toBeInTheDocument();
});

test("Renders a loading message", async () => {
  render(<App />);
  const loading = await screen.findByText(/Loading.../i);
  expect(loading).toBeInTheDocument();
});
