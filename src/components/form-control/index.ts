import { renderTemplate } from "@utils";
import { Input, Label } from "@components";
import { Block } from "@infrastructure";
import template from "./form-control.hbs";
import emptyTemplate from "./empty-form-control.hbs";
import { EmptyFormControlProps, FormControlProps } from "./types";
import "./form-control.css";

export class FormControl extends Block<FormControlProps> {
  label: Label;

  input: Input;

  constructor(props: FormControlProps) {
    if (!props.children) {
      props.children = {};
    }
    const label = new Label({
      classes: "form-control__error-label",
      text: ""
    });
    const input = new Input({
      name: props.name,
      type: props.type,
      placeholder: props.placeholder,
      classes: "form-control__input",
      events: props.events
    });
    props.children.label = label;
    props.children.input = input;
    super("div", props);
    this.label = label;
    this.input = input;
    this.makeError = this.makeError.bind(this);
    this.makeSuccess = this.makeSuccess.bind(this);
  }

  makeError(error: string) {
    this.label.setProps({
      text: error,
      classes: "form-control__error-label form-control__error-label_shown"
    });
    this.input.setProps({
      classes: "form-control__input form-control__input_error"
    });
  }

  makeSuccess() {
    this.label.setProps({
      text: "",
      classes: "form-control__error-label"
    });
    this.input.setProps({
      classes: "form-control__input"
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {
      classes: this.props.classes,
      title: this.props.title
    });
  }
}

export const EmptyFormControl = ({ content, classes }: EmptyFormControlProps) =>
  renderTemplate(emptyTemplate, { content, classes });
