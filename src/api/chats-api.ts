import { Chat, ChatResponse, Token } from "@types";
import BaseAPI from "./base-api";

export class ChatsApi extends BaseAPI {
  constructor() {
    super("/chats");
  }

  getChats() {
    return this.http.get<ChatResponse[]>("/");
  }

  getToken(id: number) {
    return this.http.post<Token[]>(`/token/${id}`);
  }

  createChat(title: string) {
    return this.http.post<Pick<Chat, "id">>("/", {
      data: {
        title
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  }

  addUsers(chatId: number, users: number[]) {
    return this.http.put("/users", {
      data: { chatId, users },
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  }

  public deleteChat(chatId: number, users: number[]) {
    return this.http.delete("/", {
      data: { chatId, users }
    });
  }

  create = undefined;

  update = undefined;

  delete = undefined;

  read = undefined;
}
