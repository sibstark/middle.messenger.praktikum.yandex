import { renderTemplate } from "@utils";
import template from "./form-control.hbs";
import emptyTemplate from "./empty-form-control.hbs";
import { EmptyFormControlProps, FormControlProps } from "./types";
import "./form-control.css";

export const FormControl = ({
  label,
  classes,
  name,
  type,
  placeholder,
  inputClasses,
  errorText
}: FormControlProps) =>
  renderTemplate(template, {
    label,
    classes,
    name,
    type,
    placeholder,
    inputClasses,
    errorText
  });

export const EmptyFormControl = ({
  content,
  classes
}: EmptyFormControlProps) =>
  renderTemplate(emptyTemplate, { content, classes });
