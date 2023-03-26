import { ExternalClasses } from "@types";
import { Block } from "@infrastructure";

export type ErrorContainerProps = ExternalClasses<{
  code: string | number;
  body: string | Block;
  link?: Block
}>;
