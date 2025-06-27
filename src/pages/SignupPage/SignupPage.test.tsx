import { render } from "@testing-library/react";
import SignupPage from "./SignupPage";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../../contexts/LanguageContext";

describe("SignupPage", () => {
  it("renders the Signup page", () => {
    render(
      <BrowserRouter>
        <LanguageProvider>
          <SignupPage />
        </LanguageProvider>
      </BrowserRouter>
    );
  });
}); 