import { ExternalClasses } from "@types";
import { Block } from "@infrastructure";

export type NavProps = ExternalClasses<{
  body: Block | Block[];
}>;
