import React from "react";
import { render } from "@testing-library/react";
import ErrorBoundary from "../components/ErrorBoundary/Error";

describe("ErrorBoundary", () => {
  it("renders without crashing", () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>,
    );
  });

  it("renders children when there is no error", () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>,
    );

    expect(getByText("Test content")).toBeDefined();
  });

  it("renders error message when there is an error", () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ChildComponentWithError />
      </ErrorBoundary>,
    );

    expect(getByText("Sorry.. there was an error")).toBeDefined();
  });
});

const ChildComponentWithError: React.FC = () => {
  throw new Error("Test error");
};
