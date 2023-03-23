import { Block } from "@infrastructure";
import template from "./button.hbs";
import { ButtonProps } from "./types";
import "./button.css";

export class Button1 extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super("input", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
