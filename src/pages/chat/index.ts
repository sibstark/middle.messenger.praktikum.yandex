import { Page } from "@modules";
import { Main, RoundPill } from "@components";
import { chatsController } from "@controllers";
import {
  ArrowRight,
  ChatInput,
  ChatMessage,
  ChatMessageProps
} from "./components";
import { MessageActions, ChatArea, ChatSidebar, ChatActions } from "./modules";

const messageList: ChatMessageProps[] = [
  {
    time: "11:32",
    message:
      "Jenny and I have been friends for a long time. We usually do everything together and have " +
      "so much fun. From days out to being each other's support when times are tough, we always " +
      "have each others back. We have shared so many memories that we will always cherish. Jenny " +
      "is my best friend and I wouldn't have it any"
  },
  {
    time: "11:52",
    message:
      "Jenny and I have been friends for a long time. We usually do everything together and " +
      "have so much fun. From days out to being each other's support when times are tough, " +
      "we always have each others back. We have shared so many memories that we will always " +
      "cherish. Jenny is my best friend and I wouldn't have it any"
  },
  {
    time: "11:54",
    message: "Hi, Mom! I love you!",
    classes: "chat-message_own"
  },
  {
    time: "11:52",
    message:
      "Jenny and I have been friends for a long time. We usually do everything together and have " +
      "so much fun. From days out to being each other's support when times are tough, we always " +
      "have each others back. We have shared so many memories that we will always cherish. Jenny " +
      "is my best friend and I wouldn't have it any"
  },
  {
    time: "11:54",
    message: "Hi, Mom! I love you!",
    classes: "chat-message_own"
  }
];
export class RenderChatPage extends Main {
  constructor() {
    const sidebar = new ChatSidebar();
    const messageActions = MessageActions();
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
            console.log("message", {
              message: input.value
            });
          }
        }
      }
    });
    const messages = messageList.map(msg => new ChatMessage(msg));
    const area = new ChatArea({
      name: "Mom",
      chatActions: new ChatActions(),
      messageActions,
      messages,
      sendMessage: [input, submit]
    });
    const page = new Page({ body: [sidebar, area], classes: "page_row" });
    super({ body: page });
  }

  componentDidMount() {
    chatsController.getChats();
  }
}
