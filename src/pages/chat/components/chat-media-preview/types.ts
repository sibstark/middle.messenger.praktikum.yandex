import { Events, ExternalClasses } from "@types";
import { Block } from "@utils";
import { Cross } from "@components";

export type ChatPreviewProps = ExternalClasses<
  Events & {
    id: number;
    title: string;
    text?: string;
    time?: string;
    unreadCount: number;
    avatar: Block;
    cross: Cross;
  }
>;

export type ConstructChatPreviewProps = Omit<
  ChatPreviewProps,
  "avatar" | "cross"
> & {
  avatar: string;
};
