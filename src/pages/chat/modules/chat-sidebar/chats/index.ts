import { Block, connect } from "@utils";
import template from "./chats.hbs";
import { ChatsProps } from "./types";
import { connectChats } from "../helpers";

class Chats extends Block<ChatsProps> {
  constructor(props: ChatsProps) {
    super("div", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const ConnectedChats = connect(connectChats)(Chats);

export { ConnectedChats as Chats };
