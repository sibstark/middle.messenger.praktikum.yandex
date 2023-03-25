import { Block } from "@infrastructure";
import template from "./link.hbs";
import { LinkProps } from "./types";
import "./link.css";

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super("a", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
