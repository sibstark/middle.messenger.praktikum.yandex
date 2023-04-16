/* eslint-disable max-len */
import { AuthorizationContainer, Page } from "@modules";
import { Button, Main, RouteLink, Modal } from "@components";
import { path } from "@routes";
import { authController } from "@controllers";
import { PasswordForm } from "./password-form";
import ChangeProfileForm from "./change-profile-form";
import { Logout } from "./components/logout";

export class RenderProfilePage extends Page {
  constructor() {
    const updateForm = new ChangeProfileForm();
    const passwordForm = new PasswordForm();
    const toChatLink = new RouteLink({
      text: "Back to chat",
      classes: "link__blue",
      href: path.app
    });
    const cancel = new Button({
      type: "button",
      text: "Cancel",
      classes:
        "button_blue button_full-width authorization-container__form-control",
      events: {
        click: () => {
          logoutModal.setProps({
            classes: ""
          });
        }
      }
    });

    const yes = new Button({
      type: "button",
      text: "Yes",
      classes:
        "button_blue button_full-width authorization-container__form-control",
      events: {
        click: () => {
          authController.logout();
        }
      }
    });
    const logoutContent = new Logout({ content: [yes, cancel] });
    const logoutModal = new Modal({ content: logoutContent });
    const logout = new Button({
      type: "button",
      text: "Logout",
      classes:
        "button_blue button_full-width authorization-container__form-control",
      events: {
        click: () => {
          logoutModal.setProps({
            classes: "modal_active"
          });
        }
      }
    });
    const container = new AuthorizationContainer({
      header: "Profile",
      body: [updateForm, passwordForm, logout, toChatLink, logoutModal]
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
