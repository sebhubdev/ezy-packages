import { Btn } from "./Btn";

const btnLabel = "Ezy UI button";

export default {
  title: "Atoms/Btn",
  component: Btn,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export const Primary = {
  args: {
    children: btnLabel,
    variant: "primary",
  },
};

export const Secondary = {
  args: {
    children: btnLabel,
    variant: "secondary",
  },
};

export const PrimaryWithIcon = {
  args: {
    children: btnLabel,
    variant: "primary",
    icon: "search",
  },
};

export const SecondaryWithIcon = {
  args: {
    children: btnLabel,
    variant: "secondary",
    icon: "arrow",
  },
};

export const SecondaryLink = {
  args: {
    children: btnLabel,
    variant: "link",
  },
};
