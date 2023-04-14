/* eslint-disable max-len */
import { AuthorizationContainer, Page } from "@modules";
import { Main } from "@components";
import { PasswordForm } from "./password-form";
import ChangeProfileForm from "./change-profile-form";

export class RenderProfilePage extends Page {
  constructor() {
    const updateForm = new ChangeProfileForm();
    const passwordForm = new PasswordForm();
    const container = new AuthorizationContainer({
      header: "Profile",
      body: [updateForm, passwordForm]
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
