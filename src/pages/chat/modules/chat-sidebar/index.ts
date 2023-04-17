import { Block } from "@utils";
import { chatsController } from "@controllers";
import template from "./chat-sidebar.hbs";
import { ChatSidebarProps } from "./types";
import { ChatInput, ProfileLink } from "../../components";
import "./chat-sidebar.css";
import { Chats } from "./chats";

export class ChatSidebar extends Block<ChatSidebarProps> {
  constructor() {
    const link = new ProfileLink();
    const search = new ChatInput({
      placeholder: "Search",
      classes: "chat-sidebar-header__search-input",
      events: {
        input: (e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          console.log("value", value);
          chatsController.search(value);
        }
      }
    });
    const chats = new Chats();
    super("aside", { chats, search, link });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
