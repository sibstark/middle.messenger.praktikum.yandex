import { renderTemplate } from "@utils";
import template from "./chat-input.hbs";
import { ChatInputProps } from "./types";
import "./chat-input.css";

export const ChatInput = ({
  classes,
  placeholder,
  name
}: ChatInputProps) =>
  renderTemplate(template, { classes, placeholder, name });
