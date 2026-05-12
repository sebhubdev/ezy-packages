/** @type { import('@storybook/react-webpack5').Preview } */
import React from "react";
import { MemoryRouter } from "react-router-dom";
// (opcional) estilos globales del UI kit
import "../src/assets/styles/index.scss";

const preview = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: "padded",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
  },
};

export default preview;
