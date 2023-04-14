import { Block } from "@utils";
import { RouteLink } from "@components";
import template from "./chat-sidebar.hbs";
import { ChatSidebarProps } from "./types";
import "./chat-sidebar.css";

const linkText = `<span class="chat-header-profile-nav__link-text">
                    Profile
                </span>
<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9L5 5L1 1" stroke="#999999"/>
                </svg>`;

export class ChatSidebar extends Block<ChatSidebarProps> {
  constructor(props: ChatSidebarProps) {
    const link = new RouteLink({
      text: linkText,
      classes: "chat-header-profile-nav__link",
      href: props.href
    });
    super("aside", { ...props, link });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
