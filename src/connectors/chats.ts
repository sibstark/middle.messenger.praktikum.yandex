import { TStore } from "@utils";
import { Chat } from "@types";

export function connectChats(store: TStore): { chats: Chat[] } {
  let chats = store.chats.chats;
  if (store.chats.filter) {
    chats = chats.filter(_ => _.title.includes(store.chats.filter));
  }
  return {
    chats
  };
}
