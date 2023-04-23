import { Block } from "@utils";
import { chatsController } from "@controllers";
import { Button } from "@components";
import template from "./chat-sidebar.hbs";
import { ChatSidebarProps } from "./types";
import { ChatInput, ProfileLink } from "../../components";
import { Chats } from "./chats";
import { AddChat } from "./add-chat";
import "./chat-sidebar.css";

export class ChatSidebar extends Block<ChatSidebarProps> {
  constructor() {
    const link = new ProfileLink();
    const search = new ChatInput({
      placeholder: "Search",
      classes: "chat-sidebar-header__search-input",
      events: {
        input: (e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          chatsController.search(value);
        }
      }
    });
    const chats = new Chats();
    const modal = new AddChat();
    const add = new Button({
      type: "button",
      classes: "button_link",
      text: "Add chat",
      events: {
        click: () => {
          modal.setProps({
            classes: "modal_active"
          });
        }
      }
    });
    super("aside", { chats, search, link, add, modal });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
