import { Page } from "@modules";
import { Main, RoundPill } from "@components";
import { chatsController, messageController } from "@controllers";
import { store } from "@utils";
import { ArrowRight, ChatInput } from "./components";
import { ChatArea, ChatSidebar } from "./modules";

export class RenderChatPage extends Main {
  constructor() {
    const sidebar = new ChatSidebar();
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
    const area = new ChatArea({
      sendMessage: [input, submit]
    });
    const page = new Page({ body: [sidebar, area], classes: "page_row" });
    super({ body: page });
  }

  componentDidMount() {
    chatsController.getChats();
  }

  public unmount() {
    store.set("chat.selected", null);
    this.getContent().remove();
  }
}
