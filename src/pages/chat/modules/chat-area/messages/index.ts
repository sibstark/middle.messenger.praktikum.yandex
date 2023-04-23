import { Block, formatDate, store } from "@utils";
import { WSMessage } from "@types";
import { messageController, MessageEvents } from "@controllers";
import template from "./messages.hbs";
import { ChatMessage } from "../../../components";
import { LoadMore } from "./load-more";

function mapMessage(message: WSMessage, id: number) {
  const classes = message.user_id === id ? "chat-message_own" : "";
  return new ChatMessage({
    message: message.content,
    time: formatDate(message.time),
    classes
  }).getContent();
}

export class Messages extends Block {
  constructor() {
    const more = new LoadMore({
      events: {
        click: () => {
          messageController.loadMessages();
        }
      }
    });
    super("div", { loadMore: more });
    messageController.on(MessageEvents.Messages, this.onAddList.bind(this));
    messageController.on(MessageEvents.Message, this.onAdd.bind(this));
    messageController.on(MessageEvents.Dispose, this.dispose.bind(this));
  }

  onAddList(messages: WSMessage[], status: string) {
    const user = store.getState().user.user;
    const list = messages.map(_ => mapMessage(_, user!.id));
    const fragment = new DocumentFragment();
    fragment.append(...list);
    const firstMessage = this.getContent().querySelector("div:first-of-type");
    this.getContent().insertBefore(fragment, firstMessage);
    if (status === "initial") {
      this.getContent().scrollTop = this.getContent().scrollHeight;
    }
  }

  onAdd(message: WSMessage) {
    const user = store.getState().user.user;
    const item = mapMessage(message, user!.id);
    this.getContent().appendChild(item);
    this.getContent().scrollTop = this.getContent().scrollHeight;
  }

  dispose() {
    const divChildren = this.getContent().querySelectorAll("div");
    divChildren.forEach(div => div.remove());
  }

  public unmount() {
    messageController.off(MessageEvents.Messages, this.onAddList.bind(this));
    messageController.off(MessageEvents.Message, this.onAdd.bind(this));
    messageController.off(MessageEvents.Dispose, this.dispose.bind(this));
    this.getContent().remove();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
