import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    supportFile: 'cypress/support/component.tsx',
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
