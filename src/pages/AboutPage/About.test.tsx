import { render } from "@testing-library/react";
import AboutPage from "./About";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../../contexts/LanguageContext";

describe("AboutPage", () => {
  it("renders the About page", () => {
    render(
      <BrowserRouter>
        <LanguageProvider>
          <AboutPage />
        </LanguageProvider>
      </BrowserRouter>
    );
  });
}); 