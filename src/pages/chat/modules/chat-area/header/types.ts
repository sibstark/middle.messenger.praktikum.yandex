import { Block } from "@utils";

export type HeaderProps = {
  avatar: Block;
  name: string;
  actions: Block;
};

export type ConstructHeaderProps = Omit<HeaderProps, "actions">;
