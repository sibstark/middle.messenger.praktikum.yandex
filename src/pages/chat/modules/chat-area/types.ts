import { Block } from "@utils";

export type ChatAreaProps = {
  messages: Block;
  sendMessage: Block | Block[];
  header: Block;
};

export type ConstructChatAreaProps = Pick<ChatAreaProps, "sendMessage">;
