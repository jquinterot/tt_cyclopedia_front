/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string): R;
      toHaveClass(...classNames: string[]): R;
    }
  }
}
