import { renderTemplate } from "@utils";
import template from "./button.hbs";
import { ButtonProps } from "./types";
import "./button.css";

export const Button = ({ type, classes, text }: ButtonProps) =>
  renderTemplate(template, { type, classes, text });
