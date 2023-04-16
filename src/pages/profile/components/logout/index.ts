import { Block } from "@utils";
import template from "./logout.hbs";
import { LogoutProps } from "./types";
import "./logout.css";

export class Logout extends Block<LogoutProps> {
  constructor(props: LogoutProps) {
    super("div", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
