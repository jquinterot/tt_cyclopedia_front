import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider, LanguageContext } from "@/contexts/LanguageContext";
import { useContext } from "react";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <LanguageProvider>{children}</LanguageProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

function TestComponent() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("No language context");
  const { t, language, setLanguage } = context;
  return (
    <div>
      <span data-testid="current-language">{language}</span>
      <span data-testid="translated-text">{t("nav.home")}</span>
      <button data-testid="switch-lang" onClick={() => setLanguage("es")}>
        Switch
      </button>
    </div>
  );
}

describe("LanguageContext", () => {
  test("default language is English", () => {
    render(<TestComponent />, { wrapper });
    expect(screen.getByTestId("current-language")).toHaveTextContent("en");
  });

  test("translates English correctly", () => {
    render(<TestComponent />, { wrapper });
    expect(screen.getByTestId("translated-text")).toHaveTextContent("Home");
  });

  test("can switch language to Spanish", () => {
    render(<TestComponent />, { wrapper });
    fireEvent.click(screen.getByTestId("switch-lang"));
    expect(screen.getByTestId("current-language")).toHaveTextContent("es");
  });

  test("translates Spanish correctly after switch", () => {
    render(<TestComponent />, { wrapper });
    fireEvent.click(screen.getByTestId("switch-lang"));
    expect(screen.getByTestId("translated-text")).toHaveTextContent("Inicio");
  });
});
