import facebook from "@ezycore/ui/src/assets/icons/facebook.svg";
import instagram from "@ezycore/ui/src/assets/icons/instagram.svg";
import star from "@ezycore/ui/src/assets/icons/star.svg";
import starfull from "@ezycore/ui/src/assets/icons/star-full.svg";
import user from "@ezycore/ui/src/assets/icons/user.svg";
import add from "@ezycore/ui/src/assets/icons/add.svg";
import burgerMenu from "@ezycore/ui/src/assets/icons/burgerMenu.svg";
import close from "@ezycore/ui/src/assets/icons/close.svg";
import search from "@ezycore/ui/src/assets/icons/search.svg";
import cart from "@ezycore/ui/src/assets/icons/cart.svg";
import dot from "@ezycore/ui/src/assets/icons/dot.svg";
import mail from "@ezycore/ui/src/assets/icons/mail.svg";
import ukFlag from "@ezycore/ui/src/assets/icons/uk-flag.svg";
import franceFlag from "@ezycore/ui/src/assets/icons/france-flag.svg";
import spainFlag from "@ezycore/ui/src/assets/icons/spain-flag.svg";
import arrow from "@ezycore/ui/src/assets/icons/arrow.svg";
import heart from "@ezycore/ui/src/assets/icons/heart.svg";
import back from "@ezycore/ui/src/assets/icons/back.svg";
import edit from "@ezycore/ui/src/assets/icons/edit.svg";

const ICONS = {
  facebook,
  instagram,
  star,
  starfull,
  user,
  add,
  burgerMenu,
  close,
  search,
  cart,
  dot,
  mail,
  ukFlag,
  franceFlag,
  spainFlag,
  arrow,
  heart,
  back,
  edit,
} as const;

export { ICONS };

export type IconName = keyof typeof ICONS;
