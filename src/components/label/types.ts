import { Children, Events, ExternalClasses } from "@types";

export type LabelProps = ExternalClasses<Children & Events> & {
  text: string;
};
