import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CounterWithHistory2 from "../components/constext/context2";

describe("CounterWithHistory component", () => {
  it("renders without crashing", () => {
    render(<CounterWithHistory2 />);
  });

  it("renders initial count value and empty history", () => {
    render(<CounterWithHistory2 />);
    expect(screen.getByText("Count: 0")).toBeDefined();
    expect(screen.getByText("History:")).toBeDefined();
  });

  it("increments count and updates history when Increment button is clicked", () => {
    render(<CounterWithHistory2 />);
    fireEvent.click(screen.getByText("Increment"));
    expect(screen.getByText("Count: 1")).toBeDefined();
    expect(screen.getByText("History: 1")).toBeDefined();
  });

  it("decrements count and updates history when Decrement button is clicked", () => {
    render(<CounterWithHistory2 />);
    fireEvent.click(screen.getByText("Decrement"));
    expect(screen.getByText("Count: -1")).toBeDefined();
    expect(screen.getByText("History: -1")).toBeDefined();
  });

  it("renders multiple entries in history when both buttons are clicked", () => {
    render(<CounterWithHistory2 />);
    fireEvent.click(screen.getByText("Increment"));
    fireEvent.click(screen.getByText("Decrement"));
    fireEvent.click(screen.getByText("Increment"));
    expect(screen.getByText("Count: 1")).toBeDefined();
    expect(screen.getByText("History: 1, 0, 1")).toBeDefined();
  });
});
