import { renderTemplate } from "@utils";
import template from "./dropdown.hbs";
import { DropdownProps } from "./types";
import "./dropdown.css";

export const Dropdown = ({
  classes, trigger, position, content
}: DropdownProps) => renderTemplate(template, {
  classes, trigger, position, content
});

export * from "./dropdown-item";
