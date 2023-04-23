import { Block } from "@utils";
import { Button } from "@components";
import { chatsController } from "@controllers";
import { ConstructSearchResultProps, SearchResultProps } from "./types";
import result from "./result.hbs";
import "./styles.css";

export class SearchResult extends Block<SearchResultProps> {
  constructor(props: ConstructSearchResultProps) {
    const button = new Button({
      type: "button",
      text: "Add",
      classes: "button_blue",
      events: {
        click: () => {
          const name = props.user.display_name || props.user.login;
          if (!confirm(`Добавить ${name} в чат?`)) {
            return;
          }
          chatsController.addUser(this.props.user);
        }
      }
    });
    super("div", { ...props, button });
  }

  protected render(): DocumentFragment {
    return this.compile(result, this.props);
  }
}
