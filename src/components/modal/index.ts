import { renderTemplate } from "@utils";
import template from "./modal.hbs";
import { ModalProps } from "./types";
import "./modal.css";

export const Modal = ({ content, classes }: ModalProps) =>
  renderTemplate(template, { content, classes });
