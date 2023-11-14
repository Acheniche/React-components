import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyComponent from "../components/x/test2";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent initialCount={0} />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("increments count when button is clicked", () => {
    render(<MyComponent initialCount={0} />);
    const button = screen.getByText("Increment");

    fireEvent.click(button);

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
