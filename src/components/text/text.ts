import { Block } from "@utils";
import template from "./text.hbs";
import { TextProps } from "./types";
import "./text.css";

export class Text extends Block<TextProps> {
  constructor(props: TextProps) {
    super("div", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
