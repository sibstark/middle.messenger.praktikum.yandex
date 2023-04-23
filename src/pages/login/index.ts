import { AuthorizationContainer, Page } from "@modules";
import { Main } from "@components";
import { LoginForm } from "./form";

export class RenderLoginPage extends Page {
  constructor() {
    const form = LoginForm();
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
