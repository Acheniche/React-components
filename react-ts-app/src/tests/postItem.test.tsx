import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Post from "../components/Posts/PostItem";
import React from "react";

describe("Post component", () => {
  it("renders correctly", () => {
    const post = {
      name: "Tatooine",
      description: "desert",
    };

    render(
      <MemoryRouter>
        <Post {...post} />
      </MemoryRouter>,
    );

    expect(screen.getByText(post.name)).toBeDefined();
    expect(screen.getByText(`Terrain: ${post.description}`)).toBeDefined();
  });

  it("updates search params on click", () => {
    const post = {
      name: "Test Post",
      description: "Test Description",
    };

    render(
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        <Routes>
          <Route path="/"></Route>
        </Routes>
        <Post {...post} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText(post.name));
  });
});
