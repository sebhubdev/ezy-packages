// Icon.tsx
import React from "react";
import { ICONS, type IconName } from "./icons";
import parse from "html-react-parser";

type ExtraIcons = Record<string, string>;
interface IconProps {
  /** Name of the icon (keys of ICONS). */
  icon: IconName;
  /** Width/height. Number → px; string → any css unit. @default 24 */
  size?: number | string;
  /** Click handler. */
  onClick?: () => void;
  /** Extra classes for the wrapper `.icon`. */
  classes?: string;
  icons?: ExtraIcons;
}

/**
 * Renders an inline SVG icon from the ICONS map.
 *
 * @example
 * ```tsx
 * <Icon icon="user" size={24} />
 * ```
 *
 * @property icon - Name of the icon (keys of ICONS).
 * @property size - Width/height. Number → px; string → any css unit. Default: 24.
 * @property onClick - Click handler.
 * @property classes - Extra CSS classes for the wrapper `.icon`.
 */
function Icon({ icon, size = 24, onClick, classes, icons = {} }: IconProps) {
  const allIcons = {
    ...ICONS,
    ...icons,
  };

  const SvgIcon = allIcons[icon] ?? ICONS.dot;
  return (
    <div
      onClick={onClick}
      className={`icon icon-${icon}${classes ? ` ${classes}` : ""}`}
    >
      {parse(SvgIcon)}
    </div>
  );
}

export default Icon;
export type { IconProps };
