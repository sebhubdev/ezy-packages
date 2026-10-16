import React from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import Button from "@ezycore/ui/components/atoms/Btn/Btn";

export default {
  title: "Core/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "Componente original Btn. Las variantes se aplican a su span interior. disabled y otros atributos nativos adicionales no llegan al button: la historia DisabledLimitation documenta este comportamiento sin corregirlo. size genera clases; el SCSS actual no define estilos específicos para sm/md/lg.",
      },
    },
  },
  args: {
    children: "Continuar",
    variant: "primary",
    size: "md",
    type: "button",
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "link", "arrow", "icon"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    icon: {
      control: "select",
      options: [undefined, "add", "search", "arrow", "heart"],
    },
    iconPosition: { control: "inline-radio", options: ["left", "right"] },
    type: { control: "select", options: ["button", "submit", "reset"] },
    disabled: {
      control: "boolean",
      description: "Limitación: no desactiva el button nativo.",
    },
    onClick: { control: false },
  },
};

export const Primary = {
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole("button", {
      name: "Continuar",
    });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
    await expect(button.querySelector(".btn")).toHaveClass("btn--primary");
  },
};
export const Secondary = { args: { variant: "secondary" } };
export const Tertiary = { args: { variant: "tertiary" } };
export const LinkAppearance = { args: { variant: "link" } };
export const IconLeft = { args: { icon: "add", iconPosition: "left" } };
export const IconRight = { args: { icon: "arrow", iconPosition: "right" } };
export const SizeClasses = {
  render: (args) => (
    <>
      {["sm", "md", "lg"].map((size) => (
        <Button {...args} key={size} size={size}>
          {size}
        </Button>
      ))}
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Las tres clases de tamaño existen en el marcado; el Core no les asigna estilos específicos actualmente.",
      },
    },
  },
};
export const DisabledLimitation = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: {
        story:
          "Caracterización de un defecto existente: disabled=true sigue permitiendo el clic. No representa un estado desactivado funcional.",
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button).toBeEnabled();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};
