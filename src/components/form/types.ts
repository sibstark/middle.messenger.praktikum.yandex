import { Children, Events, ExternalClasses } from "@types";
import { Block } from "@infrastructure";

export type TValidationFunc = (input: HTMLInputElement, context: any) => void;

export type FromProps = Children &
  Events &
  ExternalClasses<{
    content: Block | Block[];
    validationScheme?: Record<string, RegExp | TValidationFunc>;
  }>;
