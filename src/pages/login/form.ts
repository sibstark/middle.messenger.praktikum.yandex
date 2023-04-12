import { FormControl, Button, Form, RouteLink, Text } from "@components";
import { loginValidation, passValidation } from "@utils";
import { path } from "@routes";
import { authController } from "@controllers";
import { SigninRequest } from "@api";

export function LoginForm() {
  const text = new Text({
    text: ""
  });

  const login = new FormControl({
    classes: "authorization-container__form-control",
    title: "Login",
    name: "login",
    type: "text",
    placeholder: "Login"
  });

  const password = new FormControl({
    classes: "authorization-container__form-control",
    title: "Password",
    name: "password",
    type: "password",
    placeholder: "Password"
  });

  const submit = new Button({
    type: "submit",
    text: "Sign in",
    classes:
      "button_blue button_full-width authorization-container__form-control"
  });

  const registrationLink = new RouteLink({
    text: "Create account",
    classes: "link__blue",
    href: path.registration
  });

  const onSubmit = async (data: Record<string, string>) => {
    text.setProps({
      text: "",
      classes: ""
    });
    const action = await authController.signin(data as SigninRequest);
    if (!action.success) {
      text.setProps({
        text: action.entity.reason,
        classes: "text_danger"
      });
    }
  };

  return new Form(
    {
      name: "login_form",
      content: [login, password, submit, text, registrationLink],
      onSubmit
    },
    {
      login: loginValidation,
      password: passValidation
    }
  );
}
