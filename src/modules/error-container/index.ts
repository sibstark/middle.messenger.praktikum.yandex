import { Block } from "@utils";
import { RouteLink } from "@components";
import template from "./error-container.hbs";
import { ErrorContainerProps } from "./types";
import "./error-container.css";

export class ErrorContainer extends Block<ErrorContainerProps> {
  link: RouteLink;

  constructor(props: ErrorContainerProps) {
    const link = new RouteLink({
      href: "/app",
      text: "Back to chat",
      classes: "link__blue"
    });
    super("div", { ...props, link });
    this.link = link;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
