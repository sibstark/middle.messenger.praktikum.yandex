import { renderTemplate } from "@utils";
import template from "./chat-area.hbs";
import { Avatar } from "../../components";
import { ChatAreaProps } from "./types";
import "./chat-area.css";

export const ChatArea = ({
  name,
  membersAction,
  messages,
  messageActions,
  input,
  submit
}: ChatAreaProps) => {
  const avatar = Avatar();
  return renderTemplate(template, {
    name,
    membersAction,
    messages,
    messageActions,
    avatar,
    input,
    submit
  });
};
