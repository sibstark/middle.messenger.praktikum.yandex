import { Children, Events, ExternalClasses } from "@types";
import { Block } from "@utils";

export type ModalProps = ExternalClasses<Children & Events> & {
  content: Block | Block[];
  cross: Block;
};
