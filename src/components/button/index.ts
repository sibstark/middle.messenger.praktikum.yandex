import { Block } from "@infrastructure";
import template from "./button.hbs";
import { ButtonProps } from "./types";
import "./button.css";

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super("button", props);
  }

  protected render(): DocumentFragment {
    const classes = this.props.classes ? ` ${this.props.classes}` : "";
    return this.compile(template, {
      ...this.props,
      classes: "button" + classes
    });
  }
}
