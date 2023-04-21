import { Block, connect, TStore } from "@utils";
import { Empty } from "@components";
import template from "./header.hbs";
import { ConstructHeaderProps, HeaderProps } from "./types";
import { Avatar } from "../../../components";
import { ChatActions } from "../dropdowns";

function connector(store: TStore) {
  const chat = store.chat.selected;
  const avatar = chat ? new Avatar({ href: chat?.avatar || "" }) : new Empty();
  return {
    avatar,
    name: chat?.title
  };
}
class Header extends Block<HeaderProps> {
  constructor(props: ConstructHeaderProps) {
    const actions = new ChatActions();
    super("div", { ...props, actions });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default connect(connector)(Header);
