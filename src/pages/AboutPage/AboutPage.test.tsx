import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import AboutPage from "./AboutPage";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

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