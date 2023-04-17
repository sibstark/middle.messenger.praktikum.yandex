import { ChatsApi } from "@api";
import { Action, Chat, User } from "@types";
import { store } from "@utils";

class ChatsController {
  private api: ChatsApi;

  // private router = new Router();

  constructor() {
    // store.set("user", {});
    this.api = new ChatsApi();
  }

  async getChats() {
    const chats = store.getState().chats;
    if (chats.fetching) {
      throw new Error("Already in process");
    }
    store.set("chats.fetching", true);
    try {
      const response = await this.api.getChats();
      const chats: Chat[] = response.map(c => ({
        id: c.id,
        title: c.title,
        avatar: c.avatar,
        unread_count: c.unread_count,
        last_message: {
          user: {
            first_name: c.last_message.user.first_name,
            second_name: c.last_message.user.second_name,
            avatar: c.last_message.user.avatar,
            email: c.last_message.user.email,
            login: c.last_message.user.login,
            phone: c.last_message.user.phone
          },
          time: new Date(c.last_message.time),
          content: c.last_message.content
        }
      }));
      store.set("chats.chats", chats);
    } catch (e) {
      console.log("getChats", e);
    } finally {
      store.set("chats.fetching", false);
    }
  }

  async createChat(title: string): Promise<Action<any>> {
    try {
      store.set("chats.fetching", true);
      const chat = await this.api.createChat(title);
      await this.getChats();
      return {
        success: true,
        entity: chat
      };
    } catch (e) {
      console.log("logout", e);
      return {
        success: false,
        entity: e
      };
    } finally {
      store.set("chats.fetching", false);
    }
  }

  async addUser(chatId: number, userId: number): Promise<Action<any>> {
    try {
      const user = await this.api.addUsers(chatId, [userId]);
      store.set("user.user", user);
      return {
        success: true,
        entity: user
      };
    } catch (e) {
      console.log("fetchUser", e);
      return {
        success: false,
        entity: e
      };
    }
  }

  async tryAddChatUser(user: User): Promise<Action<any>> {
    let chat: Chat = {} as Chat;
    if (!chat) {
      const title = user.display_name || user.login;
      const action = await this.createChat(title);
      if (action.success) {
        chat = action.entity;
      }
      return action;
    }
    return this.addUser(chat?.id, user.id);
  }

  search(filter: string) {
    store.set("chats.filter", filter);
  }
}

export const chatsController = new ChatsController();
