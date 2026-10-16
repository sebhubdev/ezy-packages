import React, { useRef, useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import SelectField from "@ezycore/ui/components/molecules/Form/Fields/SelectField";

export default {
  title: "Core/SelectField",
  component: SelectField,
  parameters: {
    docs: {
      description: {
        component:
          "SelectField original, sin adaptaciones. Renderiza un select y un input checkbox con el mismo nombre y ref. onChange recibe target.checked (undefined al cambiar el select). La validación required usa la referencia del input adicional. Estas historias documentan el comportamiento actual; no lo presentan como correcto.",
      },
    },
  },
  args: {
    label: "Grupo",
    name: "group",
    placeholder: "Selecciona un grupo",
    options: [
      { value: "early", label: "3–6 años" },
      { value: "primary", label: "6–12 años" },
    ],
    required: false,
    defaultChecked: false,
    onChange: fn(),
  },
  argTypes: {
    options: { control: "object" },
    onChange: { control: false },
    register: { control: false },
    type: {
      control: false,
      description:
        "El valor original por defecto es checkbox; no se fuerza otro tipo para ocultar defectos.",
    },
  },
};

export const Default = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await expect(canvas.getByRole("checkbox")).not.toBeChecked();
    await userEvent.selectOptions(select, "primary");
    await expect(select).toHaveValue("primary");
    await expect(args.onChange).toHaveBeenLastCalledWith(undefined);
  },
};
export const EmptyOptions = { args: { options: [] } };
export const AdditionalInputChecked = {
  args: { defaultChecked: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("checkbox")).toBeChecked();
  },
};
export const MissingLabelLimitation = {
  args: { label: "" },
  parameters: {
    docs: {
      description: {
        story:
          "Sin label, el componente no renderiza ni el selector ni el input adicional.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).queryByRole("combobox"),
    ).not.toBeInTheDocument();
  },
};

function RequiredExample(args) {
  const validator = useRef(() => false);
  const [result, setResult] = useState("Sin validar");
  return (
    <>
      <SelectField
        {...args}
        register={(validate) => {
          validator.current = validate;
        }}
      />
      <button
        type="button"
        onClick={() => setResult(String(validator.current()))}
      >
        Validar
      </button>
      <output aria-label="Resultado">{result}</output>
    </>
  );
}
export const RequiredLimitation = {
  args: { required: true },
  render: (args) => <RequiredExample {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Sin elegir opción, la validación devuelve true porque consulta el input adicional. Se documenta el defecto, sin sustituir el validador del Core.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Validar" }));
    await expect(canvas.getByLabelText("Resultado")).toHaveTextContent("true");
  },
};
