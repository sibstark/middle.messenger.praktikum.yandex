import { Input } from "@components";
import { classnames } from "@utils";
import { ChatInputProps } from "./types";

export const ChatInput = ({ classes, placeholder, name }: ChatInputProps) =>
  new Input({
    type: "text",
    classes: classnames("chat-input", classes),
    placeholder,
    name
  });
