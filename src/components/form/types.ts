import { Children, Events, ExternalClasses, TValidationFunc } from "@types";
import { Block, EventBlock } from "@utils";

export type TValidationScheme = Record<string, TValidationFunc>;

export type FromProps = Children &
  Events &
  ExternalClasses<{
    name: string;
    content: (Block | EventBlock)[];
  }>;
