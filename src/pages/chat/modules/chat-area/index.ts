import { Block } from "@utils";
import template from "./chat-area.hbs";
import { ChatAreaProps, ConstructChatAreaProps } from "./types";
import "./chat-area.css";
import Header from "./header";

export class ChatArea extends Block<ChatAreaProps> {
  constructor(props: ConstructChatAreaProps) {
    const header = new Header();
    super("div", { ...props, header, messages: [] });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
