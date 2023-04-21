import { Button, Input, Modal } from "@components";
import { userController } from "@controllers";
import { Block, connect } from "@utils";
import { ConstructModalBodyProps, ModalBodyProps } from "./types";
import { connectUsers } from "./connector";
import template from "./body.hbs";
import "./body.css";

class ModalBody extends Block<ModalBodyProps> {
  login: string = "";

  constructor(props: ConstructModalBodyProps) {
    const button = new Button({
      type: "button",
      text: "Search",
      classes: "button_blue",
      events: {
        click: () => {
          userController.findUsers(this.login);
        }
      }
    });
    const input = new Input({
      type: "text",
      placeholder: "Login",
      events: {
        input: (e: Event) => {
          this.login = (e.target as HTMLInputElement).value;
        }
      }
    });
    super("div", { users: props.users, button, input });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const ConnectedModalBody = connect(connectUsers)(ModalBody);

export class AddChat extends Modal {
  constructor() {
    super({ content: new ConnectedModalBody() });
  }
}
