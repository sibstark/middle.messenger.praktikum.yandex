import { AuthAPI } from "@api";

class MessageController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }
}

export const messageController = new MessageController();
