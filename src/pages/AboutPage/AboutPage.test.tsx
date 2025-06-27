import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import AboutPage from "./AboutPage";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";

describe("AboutPage", () => {
  it("renders the About page", () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <LanguageProvider>
            <AboutPage />
          </LanguageProvider>
        </BrowserRouter>
      </HelmetProvider>
    );
  });
}); 