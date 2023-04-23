import { Children, Events, ExternalClasses } from "@types";

export type TextProps = Children & Events & ExternalClasses<{ text?: string }>;
