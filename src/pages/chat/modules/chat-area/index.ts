import { Block } from "@utils";
import template from "./chat-area.hbs";
import { ChatAreaProps, ConstructChatAreaProps } from "./types";
import Header from "./header";
import { Messages } from "./messages";
import "./chat-area.css";

export class ChatArea extends Block<ChatAreaProps> {
  constructor(props: ConstructChatAreaProps) {
    const messages = new Messages();
    const header = new Header();
    super("div", { ...props, header, messages });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
