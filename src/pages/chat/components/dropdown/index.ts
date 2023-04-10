import { Block } from "@utils";
import template from "./dropdown.hbs";
import { DropdownProps } from "./types";
import "./dropdown.css";

export class Dropdown extends Block<DropdownProps> {
  constructor(props: DropdownProps) {
    super("div", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export * from "./dropdown-item";
export * from "./types";
