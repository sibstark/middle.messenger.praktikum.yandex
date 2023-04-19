import { Chat } from "@types";
import { formatDate, TStore } from "@utils";
import { connectChats as connection } from "@connectors";
import { ChatPreview } from "../../components";

export function chatMap(chat: Chat, selectedId?: number): ChatPreview {
  const classes = chat.id === selectedId ? "chat-media-preview_active" : "";
  return new ChatPreview({
    id: chat.id,
    title: chat.title,
    avatar: chat.avatar,
    unreadCount: chat.unread_count,
    text: chat.last_message?.content,
    time: chat.last_message && formatDate(chat.last_message.time),
    classes
  });
}

export function connectChats(store: TStore) {
  const selected = store.chat.selected;
  const chats = connection(store).chats.map(c => chatMap(c, selected?.id));
  return {
    chats
  };
}
