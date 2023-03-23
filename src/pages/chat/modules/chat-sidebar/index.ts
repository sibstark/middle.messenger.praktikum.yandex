import { renderTemplate } from "@utils";
import template from "./chat-sidebar.hbs";
import { ChatSidebarProps } from "./types";
import "./chat-sidebar.css";

export const ChatSidebar = ({ search, chats, href }: ChatSidebarProps) =>
  renderTemplate(template, { search, chats, href });
