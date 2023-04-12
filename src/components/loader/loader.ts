import { Block } from "@utils";
import template from "./loader.hbs";
import "./loader.css";

export class Loader extends Block {
  constructor() {
    super("div");
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
