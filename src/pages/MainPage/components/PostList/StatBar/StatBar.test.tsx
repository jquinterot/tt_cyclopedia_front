import { render, screen } from "@testing-library/react";
import StatBar from "./StatBar";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../../../../../contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("StatBar", () => {
  it("renders the label and value", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LanguageProvider>
            <StatBar label="Speed" value={7.5} color="bg-red-500" />
          </LanguageProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );
    expect(screen.getByText("Speed"));
    expect(screen.getByText("7.5"));
  });

  it("applies the correct color class", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LanguageProvider>
            <StatBar label="Control" value={8.8} color="bg-blue-500" />
          </LanguageProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );
    const progressBar = screen.getByTestId("statbar-progress");
    expect(progressBar);
  });
}); 