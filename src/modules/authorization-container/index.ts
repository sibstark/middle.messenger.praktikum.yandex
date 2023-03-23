import { renderTemplate } from "@utils";
import template from "./authorization-container.hbs";
import "./authorization-container.css";
import { AuthorizationContainerProps } from "./types";

export const AuthorizationContainer = ({
  header,
  form
}: AuthorizationContainerProps) => renderTemplate(template, { header, form });
