import { ChatsApi } from "@api";
import { EventBus, Router, store } from "@utils";
import { path } from "@routes";
import { WSMessage } from "@types";

function messageMap(m: Record<string, any>): WSMessage {
  return {
    content: m.content,
    type: m.type,
    time: new Date(m.time),
    user_id: m.user_id,
    id: m.id
  };
}

enum SocketEvents {
  Open = "open",
  Message = "message",
  Error = "error",
  Close = "close"
}
export const MessageEvents: Record<string, string> = {
  Message: "message",
  Messages: "messages",
  Dispose: "dispose"
};
class MessageController extends EventBus {
  private _url = "wss://ya-praktikum.tech/ws/chats";

  private chatsApi: ChatsApi;

  private router = new Router();

  private socket: WebSocket | null = null;

  private offset = 0;

  private _messages: WSMessage[] = [];

  private isReconnected = false;

  private initial = true;

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

  private async tryMakeUrl() {
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
    return `${this._url}/${userId}/${chatId}/${token}`;
  }

  private async connect() {
    this.offset = 0;
    const url = await this.tryMakeUrl();
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
    this.isReconnected = false;
    clearInterval(this.interval);
    this.unsubscribe();
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
    if (!this.isReconnected) {
      this.loadMessages();
    }
  }

  private catchError(e: any) {
    console.log(e.message);
    this.disconnect();
  }

  private async reconnect() {
    this.isReconnected = true;
    const url = await this.tryMakeUrl();
    try {
      this.socket = new WebSocket(url);
      this.subscribe();
    } catch (e) {
      console.log("connect", e);
    }
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
      this.reconnect();
    }
  }

  private catchMessage(e: MessageEvent<any>) {
    const data = JSON.parse(e.data);
    if (Array.isArray(data)) {
      const msgs = data.map(_ => messageMap(_));
      msgs.reverse();
      this._messages = [...msgs, ...this._messages];
      const status = this.initial ? "initial" : "";
      this.emit(MessageEvents.Messages, msgs, status);
      if (this.initial) {
        this.initial = false;
      }
    } else {
      const msg = messageMap(data);
      if (msg.type === "message") {
        this._messages = [msg, ...this._messages];
        this.emit(MessageEvents.Message, msg);
      }
    }
  }

  constructor() {
    super();
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
    this.initial = true;
    if (chat.id !== _store.chat.selected?.id) {
      store.set("chat.selected", {
        ...chat
      });
      this._messages = [];
      this.emit(MessageEvents.Dispose);
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
