import { render } from "@testing-library/react";
import SignupPage from "./SignupPage";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }
  }
});

describe("SignupPage", () => {
  it("renders the Signup page", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LanguageProvider>
            <SignupPage />
          </LanguageProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );
  });
}); 