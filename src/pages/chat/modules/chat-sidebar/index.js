import template from "bundle-text:./chat-sidebar.hbs";
import {renderTemplate} from "../../../../utils";
import "./chat-sidebar.css";

export const ChatSidebar = ({search, chats, href}) => {
    return renderTemplate(template, {search, chats, href});
};
