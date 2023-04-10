import { Block } from "@utils";
import template from "./modal.hbs";
import { ModalProps } from "./types";
import "./modal.css";

export class Modal extends Block<ModalProps> {
  constructor(props: ModalProps) {
    super("div", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
