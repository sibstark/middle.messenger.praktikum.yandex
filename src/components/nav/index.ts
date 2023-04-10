import { Block } from "@utils";
import template from "./nav.hbs";
import { NavProps } from "./types";

export class Nav extends Block<NavProps> {
  constructor(props: NavProps) {
    super("nav", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
