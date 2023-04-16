import { Block } from "@utils";
import { CrossProps } from "./types";
import template from "./cross.hbs";

export class Cross extends Block<CrossProps> {
  constructor(props: CrossProps) {
    super("svg", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
