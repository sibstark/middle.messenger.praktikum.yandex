import { Page } from "@modules";
import { Main } from "@components";
import { chatsController } from "@controllers";
import { store } from "@utils";
import { ChatArea, ChatSidebar } from "./modules";

export class RenderChatPage extends Main {
  constructor() {
    const sidebar = new ChatSidebar();
    const area = new ChatArea();
    const page = new Page({ body: [sidebar, area], classes: "page_row" });
    super({ body: page });
  }

  componentDidMount() {
    chatsController.getChats();
  }

  public unmount() {
    store.set("chat.selected", null);
    this.getContent().remove();
  }
}
