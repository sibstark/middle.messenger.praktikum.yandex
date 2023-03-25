import { Block } from "@infrastructure";
import template from "./main.hbs";
import { MainProps } from "./types";

export class Main extends Block<MainProps> {
  constructor(props: MainProps) {
    super("main", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
