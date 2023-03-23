import { renderTemplate } from "@utils";
import { Link } from "@components";
import template from "./error-container.hbs";
import { ErrorContainerProps } from "./types";
import "./error-container.css";

export const ErrorContainer = ({
  classes,
  code,
  body
}: ErrorContainerProps) => {
  const link = Link({
    href: "/app",
    text: "Back to chat",
    classes: "link__blue"
  });
  return renderTemplate(template, {
    classes,
    code,
    body,
    link
  });
};
