import { Children, Events, ExternalClasses } from "@types";

export type RoundPillProps = Children &
  Events &
  ExternalClasses<{
    content: string;
  }>;
