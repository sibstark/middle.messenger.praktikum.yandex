import { EventBlock } from "@utils";
import template from "./empty-form-control.hbs";
import { EmptyFormControlProps } from "./types";
import "./form-control.css";

export class EmptyFormControl extends EventBlock<EmptyFormControlProps> {
  constructor(props: EmptyFormControlProps) {
    super("div", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export * from "./types";
