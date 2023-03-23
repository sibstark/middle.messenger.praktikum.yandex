import { ExternalClasses } from "@types";

export type FormControlProps = ExternalClasses<{
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  inputClasses?: string;
  errorText?: string;
}>;

export type EmptyFormControlProps = ExternalClasses<{
  content: string;
}>;
