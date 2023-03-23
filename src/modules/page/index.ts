import { renderTemplate } from "@utils";
import template from "./page.hbs";
import { PageProps } from "./types";
import "./page.css";

export const Page = ({ body, classes }: PageProps) =>
  renderTemplate(template, { body, classes });
