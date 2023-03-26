import { Children, Events, ExternalClasses } from "@types";
import { Block } from "@infrastructure";

export type ModalProps = ExternalClasses<Children & Events> & {
  content: Block | Block[];
};
