import { Modal } from "@components";
import { Block, connect, TStore } from "@utils";
import { ModalBodyProps } from "./types";
import template from "../find-user/body.hbs";
import { SearchResult } from "./search-result";

function connector(store: TStore) {
  const users = store.chat.users.map(u => new SearchResult({ user: u }));
  return {
    users
  };
}

class ModalBody extends Block<ModalBodyProps> {
  constructor(props: ModalBodyProps) {
    super("div", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const ConnectedModalBody = connect(connector)(ModalBody);

export class RemoveUser extends Modal {
  constructor() {
    super({ content: new ConnectedModalBody() });
  }
}
