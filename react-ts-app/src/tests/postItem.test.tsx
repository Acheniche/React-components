import React from "react";
import { render } from "@testing-library/react";
import { vi } from "vitest";
import Post from "../components/Posts/PostItem";

vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
  useSearchParams: vi.fn(() => ({
    get: vi.fn(() => ""),
    set: vi.fn(),
  })),
}));

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
});
