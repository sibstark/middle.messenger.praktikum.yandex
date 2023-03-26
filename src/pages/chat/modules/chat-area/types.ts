import { Block } from "@infrastructure";

export type ChatAreaProps = {
  avatar?: Block
  name: string;
  membersAction: Block;
  messages: Block[];
  messageActions: Block;
  sendMessage: Block | Block[];
};
