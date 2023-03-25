import { Block } from "@infrastructure";
import template from "./round-pill.hbs";
import { RoundPillProps } from "./types";
import "./round-pill.css";

export class RoundPill extends Block<RoundPillProps> {
  constructor(props: RoundPillProps) {
    super("button", props);
  }

  protected render(): DocumentFragment {
    const classes = this.props.classes ? ` ${this.props.classes}` : "";
    return this.compile(template, {
      ...this.props,
      classes: "round-pill" + classes
    });
  }
}
