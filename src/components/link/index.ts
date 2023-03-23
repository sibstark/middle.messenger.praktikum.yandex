import { renderTemplate } from "@utils";
import template from "./link.hbs";
import { LinkProps } from "./types";
import "./link.css";

export const Link = ({ href, classes, text }: LinkProps) =>
  renderTemplate(template, { href, classes, text });
