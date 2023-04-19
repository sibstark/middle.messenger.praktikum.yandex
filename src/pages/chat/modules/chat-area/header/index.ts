import { Block, connect, TStore } from "@utils";
import { Empty } from "@components";
import template from "./header.hbs";
import { HeaderProps } from "./types";
import { Avatar } from "../../../components";

function connector(store: TStore) {
  const chat = store.chat.selected;
  const avatar = chat ? new Avatar({ href: chat?.avatar || "" }) : new Empty();
  return {
    avatar,
    name: chat?.title
  };
}
class Header extends Block<HeaderProps> {
  constructor(props: HeaderProps) {
    super("div", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default connect(connector)(Header);
