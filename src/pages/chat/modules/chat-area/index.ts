import { Block } from "@infrastructure";
import template from "./chat-area.hbs";
import { Avatar } from "../../components";
import { ChatAreaProps } from "./types";
import "./chat-area.css";

export class ChatArea extends Block<ChatAreaProps> {
  constructor(props: ChatAreaProps) {
    const avatar = new Avatar({});
    super("div", { ...props, avatar });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
