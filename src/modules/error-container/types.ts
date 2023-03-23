import { ExternalClasses } from "@types";

export type ErrorContainerProps = ExternalClasses<{
  code: string | number;
  body: string;
}>;
