import { render } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../../contexts/LanguageContext";

describe("LoginPage", () => {
  it("renders the Login page", () => {
    render(
      <BrowserRouter>
        <LanguageProvider>
          <LoginPage />
        </LanguageProvider>
      </BrowserRouter>
    );
  });
}); 