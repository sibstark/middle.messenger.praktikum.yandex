import { FormControl, Button, Form, FormControlProps, Text } from "@components";
import {
  confirmPassValidation,
  emailValidation,
  loginValidation,
  nameValidation,
  passValidation,
  phoneValidation
} from "@utils";
import { authController } from "@controllers";
import { SignupRequest } from "@api";

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
export function RegistrationForm() {
  const controls = controlsMap.map(
    (control: FormControlProps) => new FormControl(control)
  );
  const submit = new Button({
    type: "submit",
    text: "Sign up",
    classes:
      "button_blue button_full-width authorization-container__form-control"
  });

  const text = new Text({
    text: ""
  });

  const onSubmit = async (data: Record<string, string>) => {
    text.setProps({
      text: "",
      classes: ""
    });
    const action = await authController.signup(data as SignupRequest);
    if (!action.success) {
      text.setProps({
        text: action.entity.reason,
        classes: "text_danger"
      });
    }
  };

  return new Form(
    {
      name: "registration_form",
      content: [...controls, text, submit],
      onSubmit
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
}
