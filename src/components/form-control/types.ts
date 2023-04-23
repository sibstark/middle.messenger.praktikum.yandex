import { Children, Events, ExternalClasses } from "@types";
import { Block } from "@utils";

export type FormControlProps = Children &
  Events &
  ExternalClasses<{
    title: string;
    name: string;
    type: string;
    placeholder?: string;
    value?: string | number;
  }>;

export type EmptyFormControlProps = Children &
  Events &
  ExternalClasses<{
    body: string | Block;
  }>;
