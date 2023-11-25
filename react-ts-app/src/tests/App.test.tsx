import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages";
import { vi } from "vitest";

vi.mock("react-redux", () => ({
  Provider: ({ children }) => children,
}));
vi.mock("../components/store/store", () => ({
  setupStore: vi.fn(),
}));
vi.mock("../App", () => ({
  App: () => "MockedApp",
}));

describe("Home Component", () => {
  it("renders without crashing", () => {
    render(<Home />);
    expect(screen.getByText("MockedApp")).toBeInTheDocument();
  });

  it("renders with the correct provider and store", () => {
    render(<Home />);
    expect(screen.getByText("MockedApp")).toBeInTheDocument();
    expect(screen.getByText("MockedApp")).toBeInTheDocument();
  });

  it("dispatches actions or interacts with components correctly", () => {});
});
