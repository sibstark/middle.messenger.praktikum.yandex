import { Block } from "@utils";
import template from "./avatar.hbs";
import { AvatarProps } from "./types";
import "./avatar.css";

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super("div", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
