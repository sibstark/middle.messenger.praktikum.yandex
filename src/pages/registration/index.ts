import { AuthorizationContainer, Page } from "@modules";
import {
  FormControl, Button, Form, Main, FormControlProps
} from "@components";
import {
  confirmPassValidation,
  emailValidation,
  loginValidation,
  nameValidation,
  passValidation,
  phoneValidation
} from "@utils";

const controlsMap: FormControlProps[] = [
  {
    classes: "authorization-container__form-control",
    title: "First name",
    name: "first_name",
    type: "text",
    placeholder: "First name"
  },
  {
    classes: "authorization-container__form-control",
    title: "Second name",
    name: "second_name",
    type: "text",
    placeholder: "Second name"
  },
  {
    classes: "authorization-container__form-control",
    title: "Login",
    name: "login",
    type: "text",
    placeholder: "Login"
  },
  {
    classes: "authorization-container__form-control",
    title: "Email",
    name: "email",
    type: "text",
    placeholder: "Email"
  },
  {
    classes: "authorization-container__form-control",
    title: "Phone",
    name: "phone",
    type: "text",
    placeholder: "Phone"
  },
  {
    classes: "authorization-container__form-control",
    title: "Password",
    name: "password",
    type: "password",
    placeholder: "Password"
  },
  {
    classes: "authorization-container__form-control",
    title: "Confirm password",
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm password"
  }
];
export const RenderRegistrationPage = () => {
  const controls = controlsMap.map(
    (control: FormControlProps) => new FormControl(control)
  );
  const submit = new Button({
    type: "submit",
    text: "Sign up",
    classes:
      "button_blue button_full-width authorization-container__form-control"
  });

  const form = new Form(
    {
      name: "registration_form",
      content: [...controls, submit]
    },
    {
      first_name: nameValidation,
      second_name: nameValidation,
      login: loginValidation,
      email: emailValidation,
      phone: phoneValidation,
      password: passValidation,
      confirmPassword: confirmPassValidation
    }
  );

  const container = new AuthorizationContainer({
    header: "Registration",
    body: form
  });
  const main = new Main({
    body: container
  });
  return new Page({
    body: main,
    classes: "page_centered"
  });
};
