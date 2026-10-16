import React from "react";
import "../styles/preview.scss";

export default {
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    a11y: { test: "todo" },
  },
  decorators: [
    (Story) => (
      <div className="ezy-story">
        <Story />
      </div>
    ),
  ],
};
