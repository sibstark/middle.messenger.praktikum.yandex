import { renderTemplate } from "@utils";
import template from "./authorization-container.hbs";
import { AuthorizationContainerProps } from "./types";
import "./authorization-container.css";

export const AuthorizationContainer = ({
  header,
  form
}: AuthorizationContainerProps) => renderTemplate(template, { header, form });
