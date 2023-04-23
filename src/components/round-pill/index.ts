import { Block, classnames } from "@utils";
import template from "./round-pill.hbs";
import { RoundPillProps } from "./types";
import "./round-pill.css";

export class RoundPill extends Block<RoundPillProps> {
  constructor(props: RoundPillProps) {
    const classes = classnames("round-pill", props.classes);
    super("button", { ...props, classes });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
