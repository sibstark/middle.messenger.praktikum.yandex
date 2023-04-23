import { Block } from "@utils";
import { Button } from "@components";
import { chatsController } from "@controllers";
import {
  ConstructSearchResultProps,
  SearchResultProps
} from "../find-user/search-result/types";
import result from "../find-user/search-result/result.hbs";

export class SearchResult extends Block<SearchResultProps> {
  constructor(props: ConstructSearchResultProps) {
    const button = new Button({
      type: "button",
      text: "Remove",
      classes: "button_blue",
      events: {
        click: () => {
          const name = props.user.display_name || props.user.login;
          if (!confirm(`Удалить ${name} из чата?`)) {
            return;
          }
          chatsController.removeUser(this.props.user);
        }
      }
    });
    super("div", { ...props, button });
  }

  protected render(): DocumentFragment {
    return this.compile(result, this.props);
  }
}
