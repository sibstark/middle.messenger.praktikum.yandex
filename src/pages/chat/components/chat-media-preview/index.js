import template from "bundle-text:./chat-media-preview.hbs";
import {renderTemplate} from "../../../../utils";
import {Avatar} from "../avatar";
import "./chat-media-preview.css";

export const ChatMediaPreview = ({externalClasses, name, text, time, count}) => {
    const avatar = Avatar();
    return renderTemplate(template, {externalClasses, name, text, time, count, avatar});
};