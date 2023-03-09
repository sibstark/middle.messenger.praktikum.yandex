import template from "bundle-text:./chat-area.hbs";
import {renderTemplate} from "../../../../utils";
import {Avatar} from "../../components";
import "./chat-area.css";

export const ChatArea = ({name, membersAction, messages, messageActions, input, submit}) => {
    const avatar = Avatar();
    return renderTemplate(template, {name, membersAction, messages, messageActions, avatar, input, submit});
};