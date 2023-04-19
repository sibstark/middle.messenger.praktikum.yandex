import { Message, MessageResponse } from "@types";

export function mapChatMessage(data: MessageResponse): Message {
  return {
    user: {
      first_name: data.user.first_name,
      second_name: data.user.second_name,
      avatar: data.user.avatar,
      email: data.user.email,
      login: data.user.login,
      phone: data.user.phone
    },
    time: new Date(data.time),
    content: data.content
  };
}
