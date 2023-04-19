import { Block, connect, TStore } from "@utils";
import { Empty, RoundPill } from "@components";
import { messageController } from "@controllers";
import template from "./chat-area.hbs";
import { ChatAreaProps } from "./types";
import Header from "./header";
import { Messages } from "./messages";
import { ArrowRight, ChatInput } from "../../components";
import "./chat-area.css";

const messages = new Messages();
const header = new Header();
const input = new ChatInput({
  name: "message",
  placeholder: "Message",
  classes: "chat-input_text-left message-bar__message-input"
});
const submit = new RoundPill({
  content: ArrowRight,
  classes: "message-bar__send-message",
  events: {
    click: () => {
      if (input.value) {
        messageController.sendMessage(input.value);
        const element = input.getContent() as HTMLInputElement;
        element.value = "";
      }
    }
  }
});

function connector(store: TStore) {
  const chat = store.chat.selected;
  const sendMessage = chat ? [input, submit] : new Empty();
  const h = chat ? header : new Empty();
  const m = chat ? messages : new Empty();
  return { sendMessage, header: h, messages: m };
}

class ChatArea extends Block<ChatAreaProps> {
  props: any;

  constructor(props: ChatAreaProps) {
    super("div", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default connect(connector)(ChatArea);
