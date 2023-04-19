import { Block } from "@utils";
import { Events } from "@types";
import template from "./load-more.hbs";

export class LoadMore extends Block<Events> {
  constructor(props: Events) {
    super("span", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
