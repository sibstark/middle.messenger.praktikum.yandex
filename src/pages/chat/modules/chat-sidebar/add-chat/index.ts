import { Button, Input, Modal } from "@components";
import { chatsController } from "@controllers";
import { Block } from "@utils";
import { Events } from "@types";
import { ModalBodyProps } from "./types";
import template from "./body.hbs";
import "./body.css";

class ModalBody extends Block<ModalBodyProps> {
  title: string = "";

  constructor(props: Events) {
    const input = new Input({
      type: "text",
      placeholder: "Title",
      events: {
        input: (e: Event) => {
          this.title = (e.target as HTMLInputElement).value;
        }
      }
    });
    const button = new Button({
      type: "button",
      text: "Create chat",
      classes: "button_blue",
      events: {
        click: async () => {
          if (this.title) {
            const action = await chatsController.createChat(this.title);
            if (action.success) {
              this.props.events?.close();
              (input.getContent() as HTMLInputElement).value = "";
            }
          }
        }
      }
    });
    super("div", { ...props, button, input });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export class AddChat extends Modal {
  constructor() {
    const body = new ModalBody({});
    super({ content: body });
    body.setProps({
      events: {
        close: () => {
          this.setProps({
            classes: ""
          });
        }
      }
    });
  }
}
