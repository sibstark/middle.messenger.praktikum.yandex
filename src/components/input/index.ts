import { EventBlock } from "@utils";
import template from "./input.hbs";
import { InputProps } from "./types";
import "./input.css";

export class Input extends EventBlock<InputProps> {
  constructor(props: InputProps) {
    super("input", props);
  }

  public get value(): string {
    return (this.getContent() as HTMLInputElement).value;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
