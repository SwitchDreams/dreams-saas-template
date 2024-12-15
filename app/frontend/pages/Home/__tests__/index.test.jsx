import { render, screen } from "@testing-library/react";
import React from "react";

import HomePage from "../Index";

describe("Home Page", () => {
  it("renders the page correctly", () => {
    render(<HomePage />);

    expect(screen.getByText("Welcome to Dreams SaaS Template!")).toBeInTheDocument();
  });
});
