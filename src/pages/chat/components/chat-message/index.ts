import { Block } from "@infrastructure";
import template from "./chat-message.hbs";
import { ChatMessageProps } from "./types";
import "./chat-message.css";

export class ChatMessage extends Block<ChatMessageProps> {
  constructor(props: ChatMessageProps) {
    super("div", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export * from "./types";
