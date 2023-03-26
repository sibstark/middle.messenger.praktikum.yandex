import { Block } from "@infrastructure";

export type AuthorizationContainerProps = {
  header: string;
  body: Block | Block[];
}
