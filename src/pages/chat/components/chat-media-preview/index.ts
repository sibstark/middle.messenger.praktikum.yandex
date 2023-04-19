import { Block } from "@utils";
import { Cross } from "@components";
import { chatsController, messageController } from "@controllers";
import template from "./chat-media-preview.hbs";
import { Avatar } from "../avatar";
import { ChatPreviewProps, ConstructChatPreviewProps } from "./types";
import "./chat-media-preview.css";

export class ChatPreview extends Block<ChatPreviewProps> {
  constructor(props: ConstructChatPreviewProps) {
    const avatar = new Avatar({
      href: props.avatar
    });
    const cross = new Cross({
      classes: "message-timer-bar__action",
      events: {
        click: () => {
          if (!confirm(`Удалить чат с ${this.props.title}?`)) {
            return;
          }
          chatsController.removeChat(this.props.id);
        }
      }
    });
    super("div", {
      ...props,
      avatar,
      cross,
      events: {
        click: () => {
          messageController.changeChat(props.id);
        }
      }
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export * from "./types";
