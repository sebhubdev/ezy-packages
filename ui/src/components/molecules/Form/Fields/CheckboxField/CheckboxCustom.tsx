import React, { useMemo } from "react";
import Checkbox from "@ezycore/ui/src/components/atoms/Form/Checkbox";
import Icon, { type IconProps } from "@ezycore/ui/src/components/atoms/Icon";

export interface CheckboxCustomProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  value?: string;
  required?: boolean;

  size?: number | string;
  /** Icono cuando está checked. @default "check" */
  checkedIcon?: IconProps["icon"];
  /** Icono para indeterminate (opcional). */
  indeterminateIcon?: string;
  /** Estado indeterminado visual (no altera el valor checked). */
  indeterminate?: boolean;
}

const CheckboxCustom: React.FC<CheckboxCustomProps> = ({
  checked,
  onChange,
  disabled = false,
  id,
  name,
  size = 20,
  className,
  checkedIcon = "full",
  indeterminateIcon = "minus",
  indeterminate = false,
}) => {
  const boxStyle = useMemo<React.CSSProperties>(() => {
    const val = typeof size === "number" ? `${size}px` : size;
    return { inlineSize: val, blockSize: val };
  }, [size]);

  return (
    <div
      className="checkbox-custom"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      aria-disabled={disabled}
    >
      {/* Atom: input nativo accesible */}
      <Checkbox
        id={id}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <span
        className="m-checkbox-custom__box"
        style={boxStyle}
        aria-hidden="true"
      >
        {indeterminate && indeterminateIcon ? (
          <Icon icon={indeterminateIcon} size="70%" />
        ) : checked ? (
          <Icon icon={checkedIcon} size="70%" />
        ) : null}
      </span>
    </div>
  );
};

export default CheckboxCustom;
