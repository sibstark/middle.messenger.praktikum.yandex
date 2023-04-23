import { Block } from "@utils";
import template from "./label.hbs";
import { LabelProps } from "./types";

export class Label extends Block<LabelProps> {
  constructor(props: LabelProps) {
    super("label", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
