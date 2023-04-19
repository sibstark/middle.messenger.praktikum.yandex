import { ChatsApi } from "@api";
import { Router, store } from "@utils";
import { path } from "@routes";

enum SocketEvents {
  Open = "open",
  Message = "message",
  Error = "error",
  Close = "close"
}

class MessageController {
  private _url = "wss://ya-praktikum.tech/ws/chats";

  private chatsApi: ChatsApi;

  private router = new Router();

  private socket: WebSocket | null = null;

  private offset = 0;

  // eslint-disable-next-line no-undef
  private interval?: NodeJS.Timer;

  private async getToken(chatId: number): Promise<string | undefined> {
    try {
      const token = await this.chatsApi.getToken(chatId);
      return token.token;
    } catch (e: any) {
      if (e.status === 500) {
        this.router.go(path.serverError);
      }
      alert(e.response.reason);
    }
  }

  private async connect() {
    this.offset = 0;
    const _store = store.getState();
    const chatId = _store.chat.selected?.id;
    const userId = _store.user.user?.id;
    if (!chatId || !userId) {
      throw new Error("ChatId or userId is empty");
    }
    const token = await this.getToken(chatId);
    if (!token) {
      throw new Error("Token is empty");
    }
    const url = `${this._url}/${userId}/${chatId}/${token}`;
    try {
      this.socket = new WebSocket(url);
      this.subscribe();
    } catch (e) {
      console.log("connect", e);
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.socket) {
      return;
    }
    clearInterval(this.interval);
    this.unsubscribe();
    this.offset = 0;
    await this.socket.close();
    this.socket = null;
  }

  private subscribe() {
    if (this.socket) {
      this.socket.addEventListener(SocketEvents.Open, this.catchOpen);
      this.socket.addEventListener(SocketEvents.Close, this.catchClose);
      this.socket.addEventListener(SocketEvents.Message, this.catchMessage);
      this.socket.addEventListener(SocketEvents.Error, this.catchError);
    }
  }

  private unsubscribe() {
    if (this.socket) {
      this.socket.removeEventListener(SocketEvents.Open, this.catchOpen);
      this.socket.removeEventListener(SocketEvents.Close, this.catchClose);
      this.socket.removeEventListener(SocketEvents.Message, this.catchMessage);
      this.socket.removeEventListener(SocketEvents.Error, this.catchError);
    }
  }

  private catchOpen() {
    store.set("chat.messages", []);
    this.loadMessages();
    this.interval = setInterval(() => {
      this.socket?.send(
        JSON.stringify({
          content: "",
          type: ""
        })
      );
    }, 20000);
  }

  private catchError(e: any) {
    console.log(e.message);
    this.disconnect();
  }

  private catchClose(e: any) {
    if (e.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения");
    }

    console.log(`Код: ${e.code} | Причина: ${e.reason}`);

    this.disconnect();
    // error code is usually caused by network issues
    if (e.code === 1006) {
      this.connect();
    }
  }

  private catchMessage(e: MessageEvent) {
    console.log(e.data);
  }

  constructor() {
    this.chatsApi = new ChatsApi();
    this.catchError = this.catchError.bind(this);
    this.catchOpen = this.catchOpen.bind(this);
    this.catchMessage = this.catchMessage.bind(this);
    this.catchClose = this.catchClose.bind(this);
  }

  public async changeChat(id: number): Promise<void> {
    const _store = store.getState();
    const chat = _store.chats.chats.find(c => c.id === id);
    // need to check existing chats
    if (!chat) {
      return;
    }
    if (chat.id !== _store.chat.selected?.id) {
      store.set("chat.selected", {
        ...chat
      });
      await this.disconnect();
      await this.connect();
    }
  }

  public loadMessages() {
    if (this.socket) {
      this.socket.send(
        JSON.stringify({
          content: this.offset,
          type: "get old"
        })
      );
      this.offset += 20;
    }
  }

  public sendMessage(message: string): void {
    if (this.socket) {
      this.socket.send(
        JSON.stringify({
          content: message,
          type: "message"
        })
      );
    }
  }
}

export const messageController = new MessageController();
