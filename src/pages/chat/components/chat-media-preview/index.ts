import { Block, store } from "@utils";
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
        click: (e: MouseEvent) => {
          e.stopPropagation();
          if (!confirm(`Удалить чат с ${this.props.title}?`)) {
            return;
          }
          const selected = store.getState().chat.selected;
          chatsController.removeChat(this.props.id);
          if (selected?.id === this.props.id) {
            store.set("chat.selected", null);
          }
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
