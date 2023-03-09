import template from "bundle-text:./chat-message.hbs";
import {renderTemplate} from "../../../../utils";
import "./chat-message.css";

export const ChatMessage = ({externalClasses, content, message, time}) => {
    return renderTemplate(template, {externalClasses, content, message, time});
};