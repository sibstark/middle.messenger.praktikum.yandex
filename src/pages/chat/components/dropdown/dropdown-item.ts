import { renderTemplate } from "@utils";
import template from "./dropdown-item.hbs";
import { DropdownItemProps } from "./types";
import "./dropdown-item.css";

export const DropdownItem = ({ icon, title }: DropdownItemProps) =>
  renderTemplate(template, { icon, title });
