import { Block } from "@infrastructure";
import template from "./form.hbs";
import { FromProps } from "./types";

export class Form extends Block<FromProps> {
  constructor(props: FromProps) {
    super("form", props);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  addEvents() {
    this._element!.addEventListener("submit", this.onSubmit);
  }

  protected removeEvents() {
    this._element!.removeEventListener("submit", this.onFocus);
  }

  onSubmit(e: Event) {
    const form = e.target as HTMLFormElement;
  }

  onFocus(e: Event) {
    const input = e.target as HTMLInputElement;
    const name = input.name;
    console.log("Focus", name);
  }

  onBlur(e: Event) {
    const input = e.target as HTMLInputElement;
    const name = input.name;
    console.log("Blur", name);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
