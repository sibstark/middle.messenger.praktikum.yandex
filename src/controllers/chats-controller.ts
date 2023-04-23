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

  async addUser(user: User) {
    try {
      const chat = store.getState().chat.selected;
      if (chat) {
        await this.api.addUsers(chat.id, [user.id]);
        alert(`Пользователь ${user.login} добавлен в чат ${chat.title}`);
        this.getChatUsers();
      }
    } catch (e) {
      console.log("addUser", e);
    }
  }

  async removeUser(user: User) {
    try {
      const chat = store.getState().chat.selected;
      if (chat) {
        await this.api.removeUsers(chat.id, [user.id]);
        alert(`Пользователь ${user.login} удален из чата ${chat.title}`);
        this.getChatUsers();
      }
    } catch (e) {
      console.log("removeUser", e);
    }
  }

  async getChatUsers() {
    try {
      const chat = store.getState().chat.selected;
      if (chat) {
        const users = await this.api.getChatUsers(chat.id);
        store.set("chat.users", users);
      }
    } catch (e) {
      console.log("getChatUsers", e);
    }
  }

  async tryAddUserChat(user: User) {
    try {
      store.set("chats.fetching", true);
      await this.addUser(user);
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
