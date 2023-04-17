import { Chat } from "@types";
import { formatDate, TStore } from "@utils";
import { connectChats as connection } from "@connectors";
import { ChatPreview } from "../../components";

export function chatMap(chat: Chat): ChatPreview {
  return new ChatPreview({
    id: chat.id,
    title: chat.title,
    avatar: chat.avatar,
    unreadCount: chat.unread_count,
    text: chat.last_message.content,
    time: formatDate(chat.last_message.time)
  });
}

export function connectChats(store: TStore) {
  return {
    chats: connection(store).chats.map(chatMap)
  };
}
