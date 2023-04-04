import { AuthorizationContainer, Page } from "@modules";
import { FormControl, Button, Link, Form, Main } from "@components";
import { loginValidation, passValidation } from "@utils";

export class RenderLoginPage extends Page {
  constructor() {
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

    const registrationLink = new Link({
      text: "Create account",
      classes: "link__blue",
      href: "/registration"
    });

    const form = new Form(
      {
        name: "login_form",
        content: [login, password, submit, registrationLink]
      },
      {
        login: loginValidation,
        password: passValidation
      }
    );

    const container = new AuthorizationContainer({
      header: "Login",
      body: form
    });

    const main = new Main({
      body: container
    });

    super({
      body: main,
      classes: "page_centered"
    });
  }
}
