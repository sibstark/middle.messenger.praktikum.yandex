import { EventBlock } from "@infrastructure";
import template from "./input.hbs";
import { InputProps } from "./types";

export class Input extends EventBlock<InputProps> {
  constructor(props: InputProps) {
    super("input", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
