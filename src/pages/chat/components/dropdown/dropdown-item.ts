import { Block } from "@utils";
import template from "./dropdown-item.hbs";
import { DropdownItemProps } from "./types";
import "./dropdown-item.css";

export class DropdownItem extends Block<DropdownItemProps> {
  constructor(props: DropdownItemProps) {
    super("div", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
