import { ExternalClasses } from "@types";
import { Block } from "@utils";

export type ChatPreviewProps = ExternalClasses<{
  id: number;
  title: string;
  text: string;
  time: string;
  unreadCount: number;
  avatar: Block;
}>;

export type ConstructChatPreviewProps = Omit<ChatPreviewProps, "avatar"> & {
  avatar: string;
};
