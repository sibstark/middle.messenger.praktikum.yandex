import { AuthorizationContainer, Page } from "@modules";
import { Main } from "@components";
import { RegistrationForm } from "./form";

export class RenderRegistrationPage extends Page {
  constructor() {
    const form = RegistrationForm();
    const container = new AuthorizationContainer({
      header: "Registration",
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
