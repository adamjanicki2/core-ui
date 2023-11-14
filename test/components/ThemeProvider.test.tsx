import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "../../src/";

window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
});

describe("ThemeProvider", () => {
  it("renders correctly", () => {
    render(<ThemeProvider />);
  });
});
