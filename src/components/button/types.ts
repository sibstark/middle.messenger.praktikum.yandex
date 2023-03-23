import { Children, Events, ExternalClasses } from "@types";

export type ButtonProps = Children &
  Events &
  ExternalClasses<{
    type: string;
    text: string;
  }>;
