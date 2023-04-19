import { Block, formatDate, store } from "@utils";
import { WSMessage } from "@types";
import { messageController, MessageEvents } from "@controllers";
import template from "./messages.hbs";
import { ChatMessage } from "../../../components";

function mapMessage(message: WSMessage, id: number) {
  const classes = message.user_id === id ? "chat-message_own" : "";
  return new ChatMessage({
    message: message.content,
    time: formatDate(message.time),
    classes
  }).getContent();
}

export class Messages extends Block {
  // classes: "chat-message_own"
  constructor() {
    super("div", {});
    messageController.on(MessageEvents.Messages, this.onAddList.bind(this));
    messageController.on(MessageEvents.Message, this.onAdd.bind(this));
    messageController.on(MessageEvents.Dispose, this.dispose.bind(this));
  }

  onAddList(messages: WSMessage[]) {
    const user = store.getState().user.user;
    const list = messages.map(_ => mapMessage(_, user!.id));
    const fragment = new DocumentFragment();
    fragment.append(...list);
    this.getContent().insertBefore(fragment, this.getContent().firstChild);
    this.getContent().scrollTop = 0;
  }

  onAdd(message: WSMessage) {
    const user = store.getState().user.user;
    const item = mapMessage(message, user!.id);
    this.getContent().appendChild(item);
    this.getContent().scrollTop = this.getContent().scrollHeight;
  }

  dispose() {
    this.getContent().innerHTML = "";
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
