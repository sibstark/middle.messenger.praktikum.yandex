import template from "bundle-text:./chat-input.hbs";
import {renderTemplate} from "../../../../utils";
import "./chat-input.css";

export const ChatInput = ({externalClasses, placeholder, name}) => {
    return renderTemplate(template, {externalClasses, placeholder, name});
};
