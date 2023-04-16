import { Block } from "@utils";
import template from "./modal.hbs";
import { ModalProps } from "./types";
import { Cross } from "../cross";
import "./modal.css";

export class Modal extends Block<ModalProps> {
  cross: Cross;

  constructor(props: Omit<ModalProps, "cross">) {
    const cross = new Cross({ classes: "modal__header-cross" });
    super("div", { ...props, cross });
    this.cross = cross;
    this.cross.setProps({
      events: {
        click: (e: MouseEvent) => {
          e.stopPropagation();
          this.setProps({
            classes: ""
          });
        }
      }
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
