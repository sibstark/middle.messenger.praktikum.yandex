import { Block } from "@utils";

export type ChatAreaProps = {
  avatar?: Block;
  name: string;
  membersAction: Block;
  messages: Block[];
  messageActions: Block;
  sendMessage: Block | Block[];
};
