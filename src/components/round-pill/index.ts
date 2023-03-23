import { renderTemplate } from "@utils";
import template from "./round-pill.hbs";
import { RoundPillProps } from "./types";
import "./round-pill.css";

export const RoundPill = ({ classes, content }: RoundPillProps) =>
  renderTemplate(template, { classes, content });
