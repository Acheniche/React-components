import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import { App } from "../App";

export const fullRoutesConfig = [
  {
    path: "/",
    element: <App />,
  },
];

test("404 page is displayed when navigating to an invalid route", () => {
  const router = createMemoryRouter(fullRoutesConfig, {
    initialEntries: ["/badAdress"],
  });
  render(<RouterProvider router={router} />);
  const message = screen.getByText("404 Not Found");
  expect(message).toBeDefined();
});
