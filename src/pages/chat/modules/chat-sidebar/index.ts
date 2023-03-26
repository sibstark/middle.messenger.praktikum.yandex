import { Block } from "@infrastructure";
import template from "./chat-sidebar.hbs";
import { ChatSidebarProps } from "./types";
import "./chat-sidebar.css";

export class ChatSidebar extends Block<ChatSidebarProps> {
  constructor(props: ChatSidebarProps) {
    super("aside", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
