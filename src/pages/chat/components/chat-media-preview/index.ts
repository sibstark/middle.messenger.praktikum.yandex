import { Block } from "@utils";
import template from "./chat-media-preview.hbs";
import { Avatar } from "../avatar";
import { ChatMediaPreviewProps } from "./types";
import "./chat-media-preview.css";

export class ChatMediaPreview extends Block<ChatMediaPreviewProps> {
  constructor(props: ChatMediaPreviewProps) {
    const avatar = new Avatar({});
    super("div", { ...props, avatar });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export * from "./types";
