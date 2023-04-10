import { ExternalClasses } from "@types";
import { Block } from "@utils";

export type ChatMediaPreviewProps = ExternalClasses<{
  name: string;
  text: string;
  time: string;
  count: number;
  avatar?: Block;
}>;
