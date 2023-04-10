import { ExternalClasses } from "@types";
import { Block } from "@utils";

export type PageProps = ExternalClasses<{
  body: Block | Block[];
}>;
