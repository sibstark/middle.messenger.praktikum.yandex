import { User } from "./auth";

export type ChatResponse = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
};

export type Chat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: Pick<
      User,
      "first_name" | "second_name" | "avatar" | "email" | "login" | "phone"
    >;
    time: Date;
    content: string;
  };
};

export type Token = {
  token: "string";
};
