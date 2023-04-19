import { ChatsApi } from "@api";
import { Chat, User } from "@types";
import { store } from "@utils";
import { mapChatMessage } from "./helpers";

class ChatsController {
  private api: ChatsApi;

  // private router = new Router();

  constructor() {
    // store.set("user", {});
    this.api = new ChatsApi();
  }

  async getChats() {
    store.set("chats.fetching", true);
    try {
      const response = await this.api.getChats();
      const chats: Chat[] = response.map(c => ({
        id: c.id,
        title: c.title,
        avatar: c.avatar,
        unread_count: c.unread_count,
        last_message: c.last_message && mapChatMessage(c.last_message)
      }));
      store.set("chats.chats", chats);
    } catch (e) {
      console.log("getChats", e);
    } finally {
      store.set("chats.fetching", false);
    }
  }

  async createChat(title: string): Promise<Pick<Chat, "id">> {
    return this.api.createChat(title);
  }

  async removeChat(id: number) {
    await this.api.removeChat(id);
    await this.getChats();
  }

  async addUser(chatId: number, userId: number) {
    await this.api.addUsers(chatId, [userId]);
  }

  async tryCreateUserChat(user: User) {
    try {
      store.set("chats.fetching", true);
      const title = user.display_name || user.login;
      const chat = await this.createChat(title);
      await this.addUser(chat.id, user.id);
      await this.getChats();
    } catch (e) {
      console.log("tryCreateUserChat", e);
    } finally {
      store.set("chats.fetching", false);
    }
  }

  search(filter: string) {
    store.set("chats.filter", filter);
  }
}

export const chatsController = new ChatsController();
