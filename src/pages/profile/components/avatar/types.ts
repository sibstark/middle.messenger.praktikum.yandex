import { Events } from "@types";
import { Block } from "@utils";

export type ProfileAvatarProps = Events & {
  modal: Block;
  avatar?: string;
};
