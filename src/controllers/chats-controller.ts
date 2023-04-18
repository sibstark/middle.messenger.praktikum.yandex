import { ChatsApi } from "@api";
import { Chat, User } from "@types";
import { store } from "@utils";

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
        last_message: c.last_message && {
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

  async createChat(title: string): Promise<Pick<Chat, "id">> {
    return this.api.createChat(title);
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
