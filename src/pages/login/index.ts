import { AuthorizationContainer, Page } from "@modules";
import { FormControl, Button, Link } from "@components";

export const RenderLoginPage = () => {
  const login = FormControl({
    classes: "authorization-container__form-control",
    label: "Login",
    name: "login",
    type: "text",
    placeholder: "Login"
  });

  const password = FormControl({
    classes: "authorization-container__form-control",
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Password"
  });

  const submit = Button({
    type: "submit",
    text: "Sign in",
    classes:
      "button_blue button_full-width authorization-container__form-control"
  });

  const registrationLink = Link({
    text: "Create account",
    classes: "link__blue",
    href: "/registration"
  });

  const loginForm = `<form action="/app" method="GET">
${login}
${password}
${submit}
${registrationLink}
</form>`;
  const authorizationContainer = AuthorizationContainer({
    header: "Login",
    form: loginForm
  });
  return Page({
    body: `<main>${authorizationContainer}</main>`,
    classes: "page_centered"
  });
};
