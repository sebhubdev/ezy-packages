import React, { useEffect, useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import Input from "@ezycore/ui/components/atoms/Form/Input-new/Input";

function ControlledInput(args) {
  const [value, setValue] = useState(args.value);
  useEffect(() => setValue(args.value), [args.value]);
  return (
    <>
      <label htmlFor={args.id}>Nombre</label>
      <Input
        {...args}
        value={value}
        onChange={(next) => {
          setValue(next);
          args.onChange(next);
        }}
      />
    </>
  );
}

export default {
  title: "Core/Input",
  component: Input,
  render: (args) => <ControlledInput {...args} />,
  parameters: {
    docs: {
      description: {
        component:
          "Input original de atoms/Form/Input-new, distinto del antiguo InputText. Es controlado y necesita onChange. La historia aporta únicamente el estado del consumidor y una etiqueta externa. variant, size y state generan clases que no tienen reglas visuales propias en el SCSS actual; state=error no establece aria-invalid ni muestra validación.",
      },
    },
  },
  args: {
    id: "core-input",
    name: "name",
    value: "",
    placeholder: "Escribe tu nombre",
    type: "text",
    required: false,
    disabled: false,
    variant: "default",
    size: "md",
    state: "normal",
    onChange: fn(),
  },
  argTypes: {
    onChange: { control: false },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search"],
    },
    value: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    state: { control: "select", options: ["normal", "error", "success"] },
  },
};

export const Empty = {
  play: async ({ canvasElement, args }) => {
    const input = within(canvasElement).getByRole("textbox", {
      name: "Nombre",
    });
    await userEvent.type(input, "Ezy Core");
    await expect(input).toHaveValue("Ezy Core");
    await expect(args.onChange).toHaveBeenLastCalledWith("Ezy Core");
  },
};
export const Filled = { args: { value: "La Terre des Enfants" } };
export const Disabled = {
  args: { value: "Solo lectura por desactivación", disabled: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("textbox")).toBeDisabled();
  },
};
export const Required = {
  args: { required: true },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox");
    await expect(input.checkValidity()).toBe(false);
    await userEvent.type(input, "Nombre");
    await expect(input.checkValidity()).toBe(true);
  },
};
export const Email = {
  args: { type: "email", placeholder: "nombre@ejemplo.com" },
};
export const Password = { args: { type: "password", value: "example-only" } };
export const Number = { args: { type: "number", value: "42" } };
export const ErrorClassLimitation = {
  args: { state: "error", value: "Sin validación automática" },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox");
    await expect(input.closest(".ui-input")).toHaveClass("ui-input--error");
    await expect(input).not.toHaveAttribute("aria-invalid");
  },
};
