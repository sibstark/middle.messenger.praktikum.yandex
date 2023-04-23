import { Block } from "@utils";
import "./empty.css";

export class Empty extends Block {
  constructor() {
    super("div", {});
  }

  protected render(): DocumentFragment {
    return this.compile("<div class='empty-block' />", this.props);
  }
}
