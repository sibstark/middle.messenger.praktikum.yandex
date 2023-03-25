import { Children, Events, ExternalClasses } from "@types";

export type FormControlProps = Children &
  Events &
  ExternalClasses<{
    title: string;
    name: string;
    type: string;
    placeholder?: string;
  }>;

export type EmptyFormControlProps = Children &
  Events &
  ExternalClasses<{
    content: string;
  }>;
