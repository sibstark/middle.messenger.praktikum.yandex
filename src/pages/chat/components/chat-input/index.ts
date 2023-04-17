import { Input } from "@components";
import { classnames } from "@utils";
import { ChatInputProps } from "./types";

export class ChatInput extends Input {
  constructor(props: ChatInputProps) {
    super({
      ...props,
      type: "text",
      classes: classnames("chat-input", props.classes)
    });
  }
}
