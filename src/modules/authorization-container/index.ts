import { Block } from "@infrastructure";
import template from "./authorization-container.hbs";
import { AuthorizationContainerProps } from "./types";
import "./authorization-container.css";

export class AuthorizationContainer extends Block<AuthorizationContainerProps> {
  constructor(props: AuthorizationContainerProps) {
    super("div", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
