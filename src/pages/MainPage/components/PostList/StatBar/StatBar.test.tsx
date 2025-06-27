import { render, screen } from "@testing-library/react";
import StatBar from "./StatBar";
import React from "react";

describe("StatBar", () => {
  it("renders the label and value", () => {
    render(<StatBar label="Speed" value={7.5} color="bg-red-500" />);
    expect(screen.getByText("Speed"));
    expect(screen.getByText("7.5"));
  });

  it("applies the correct color class", () => {
    render(<StatBar label="Control" value={8.8} color="bg-blue-500" />);
    const progressBar = screen.getByTestId("statbar-progress");
    expect(progressBar);
  });
}); 