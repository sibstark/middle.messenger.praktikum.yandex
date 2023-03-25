import { Page } from "@modules";
import { concatArrayTemplates } from "@utils";
import { RoundPill } from "@components";
import {
  ArrowRight,
  ChatInput,
  ChatMediaPreview,
  ChatMessage,
  ChatMessageProps,
  ChatMediaPreviewProps
} from "./components";
import {
  MembersAction,
  MessageActions,
  ChatArea,
  ChatSidebar
} from "./modules";

const chatList: ChatMediaPreviewProps[] = [
  {
    name: "Peter",
    text: "haha",
    time: "10:42",
    count: 3
  },
  {
    name: "Alex",
    text: "Friends, I have a special news for you! Jenny and me going to go bla bla bla",
    time: "10:43",
    count: 2
  },
  {
    name: "Artur",
    text: "Friends, I have a special news for you! Jenny and me going to go bla bla bla",
    time: "10:43",
    count: 2
  },
  {
    name: "Anton",
    text: "Friends, I have a special news for you! Jenny and me going to go bla bla bla",
    time: "10:43",
    count: 2
  },
  {
    name: "Mom",
    text: "Hi, Mom! I love you!",
    time: "10:43",
    count: 5,
    classes: "chat-media-preview_active"
  },
  {
    name: "Dan",
    text: "Hi, how are you?",
    time: "10:43",
    count: 2
  },
  {
    name: "Sveta",
    text: "Hi, how are you?",
    time: "10:43",
    count: 2
  },
  {
    name: "Alena",
    text: "Hi, how are you?",
    time: "10:43",
    count: 2
  },
  {
    name: "Oleg",
    text: "Hi, how are you?",
    time: "10:43",
    count: 2
  },
  {
    name: "Work",
    text: "Hi, how are you?",
    time: "10:43",
    count: 2
  },
  {
    name: "Sigismund",
    text: "Hi, how are you?",
    time: "10:43",
    count: 2
  }
];

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
export const RenderChatPage = () => {
  const chats = concatArrayTemplates(
    chatList.map(chat => ChatMediaPreview(chat))
  );
  const search = ChatInput({
    placeholder: "Search",
    classes: "chat-sidebar-header__search-input"
  });
  const sidebar = ChatSidebar({ href: "/profile", chats, search });
  const membersAction = MembersAction();
  const messageActions = MessageActions();
  const input = ChatInput({
    name: "message",
    placeholder: "Message",
    classes: "chat-input_text-left message-bar__message-input"
  });
  const submit = new RoundPill({
    content: ArrowRight,
    classes: "message-bar__send-message"
  });
  const messages = concatArrayTemplates(
    messageList.map((msg: ChatMessageProps) => ChatMessage(msg))
  );
  const area = ChatArea({
    name: "Mom",
    membersAction,
    messageActions,
    input,
    messages,
    submit
  });
  const body = `
    ${sidebar}
    ${area}
    `;
  return `<main>${Page({ body, classes: "page_row" })}</main>`;
};
