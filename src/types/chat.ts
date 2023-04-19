import { User } from "./auth";

type MessageUser = Pick<
  User,
  "first_name" | "second_name" | "avatar" | "email" | "login" | "phone"
>;

export type Message = {
  user: MessageUser;
  time: Date;
  content: string;
};

export type MessageResponse = {
  user: MessageUser;
  time: string;
  content: string;
};

export type ChatResponse = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message?: MessageResponse;
};

export type Chat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message?: Message;
};

export type Token = {
  token: "string";
};
