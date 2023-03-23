import { renderTemplate } from "@utils";
import template from "./chat-message.hbs";
import { ChatMessageProps } from "./types";
import "./chat-message.css";

export const ChatMessage = ({
  classes,
  content,
  message,
  time
}: ChatMessageProps) =>
  renderTemplate(template, {
    classes,
    content,
    message,
    time
  });

export * from "./types";
