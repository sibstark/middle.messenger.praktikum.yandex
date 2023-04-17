import { Block } from "@utils";
import template from "./chat-media-preview.hbs";
import { Avatar } from "../avatar";
import { ChatPreviewProps, ConstructChatPreviewProps } from "./types";
import "./chat-media-preview.css";

export class ChatPreview extends Block<ChatPreviewProps> {
  constructor(props: ConstructChatPreviewProps) {
    const avatar = new Avatar({
      href: props.avatar
    });
    super("div", { ...props, avatar });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export * from "./types";
