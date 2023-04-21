import { ChatsApi } from "@api";
import { Action, Chat, User } from "@types";
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

  async createChat(
    title: string
  ): Promise<Action<Pick<Chat, "id"> | undefined>> {
    try {
      const chat = await this.api.createChat(title);
      await this.getChats();
      return {
        success: true,
        entity: chat
      };
    } catch (e) {
      return {
        success: false,
        entity: undefined
      };
    }
  }

  async removeChat(id: number) {
    await this.api.removeChat(id);
    await this.getChats();
  }

  async addUser(chatId: number, userId: number) {
    try {
      await this.api.addUsers(chatId, [userId]);
      await this.getChats();
    } catch (e) {
      console.log("addUser", e);
    }
  }

  async removeUser(chatId: number, userId: number) {
    try {
      await this.api.removeUsers(chatId, [userId]);
      await this.getChats();
    } catch (e) {
      console.log("removeUser", e);
    }
  }

  async getChatUsers(chatId: number) {
    try {
      const users = await this.api.getChatUsers(chatId);
      store.set("chat.users", users);
    } catch (e) {
      console.log("getChatUsers", e);
    }
  }

  async tryAddUserChat(chatId: number, user: User) {
    try {
      store.set("chats.fetching", true);
      await this.addUser(chatId, user.id);
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
