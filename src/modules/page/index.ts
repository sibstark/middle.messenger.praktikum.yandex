import { Block } from "@infrastructure";
import template from "./page.hbs";
import { PageProps } from "./types";
import "./page.css";

export class Page extends Block<PageProps> {
  constructor(props: PageProps) {
    super("div", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
