import { Block } from "@infrastructure";
import { Link } from "@components";
import template from "./error-container.hbs";
import { ErrorContainerProps } from "./types";
import "./error-container.css";

export class ErrorContainer extends Block<ErrorContainerProps> {
  link = new Link({
    href: "/app",
    text: "Back to chat",
    classes: "link__blue"
  });

  constructor(props: ErrorContainerProps) {
    const link = new Link({
      href: "/app",
      text: "Back to chat",
      classes: "link__blue"
    });
    super("div", { ...props, link });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
