import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Post from "../components/Posts/PostItem";

describe("Post component", () => {
  it("renders with name and description", () => {
    const props = {
      name: "TestName",
      description: "TestDescription",
    };

    const { getByText } = render(<Post {...props} />);

    expect(getByText(props.name)).toBeDefined();
    expect(getByText(`Terrain: ${props.description}`)).toBeDefined();
  });

  it("sets search params when clicked", () => {
    const props = {
      name: "TestName",
      description: "TestDescription",
    };

    vi.mock("react-router-dom", async () => {
      return {
        useLocation: vi.fn(() => ({ search: "" })),
        useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
      };
    });

    const { getByText } = render(<Post {...props} />);
    fireEvent.click(getByText(props.name));
  });
});
