import { ExternalClasses } from "@types";
import { Block } from "@infrastructure";

export type PageProps = ExternalClasses<{
  body: Block | Block[];
}>;
