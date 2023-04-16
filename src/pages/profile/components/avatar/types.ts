import { Events, User } from "@types";
import { Block } from "@utils";

export type ProfileAvatarProps = Events & {
  modal: Block;
  user: User | null;
};
