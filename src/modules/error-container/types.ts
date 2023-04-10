import { ExternalClasses } from "@types";
import { Block } from "@utils";

export type ErrorContainerProps = ExternalClasses<{
  code: string | number;
  body: string | Block;
  link?: Block;
}>;
