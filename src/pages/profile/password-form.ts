/* eslint-disable max-len */
import { FormControl, Button, Form, Text } from "@components";
import { newPasswordPassValidation, passValidation } from "@utils";
import { UpdatePasswordRequest } from "@types";
import { userController } from "@controllers";

export class PasswordForm extends Form {
  oldPassword: FormControl;

  newPassword: FormControl;

  text: Text;

  constructor() {
    const oldPassword = new FormControl({
      classes: "authorization-container__form-control",
      title: "Old password",
      name: "oldPassword",
      type: "password",
      placeholder: "Old password"
    });

    const newPassword = new FormControl({
      classes: "authorization-container__form-control",
      title: "New password",
      name: "newPassword",
      type: "password",
      placeholder: "New password"
    });
    const changePass = new Button({
      type: "submit",
      text: "Change password",
      classes:
        "button_blue button_full-width authorization-container__form-control"
    });
    const text = new Text({
      text: ""
    });
    const content = [oldPassword, newPassword, text, changePass];
    super(
      {
        name: "change_password",
        content
      },
      {
        oldPassword: passValidation,
        newPassword: newPasswordPassValidation
      }
    );
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
    this.text = text;
  }

  protected init() {
    this.props.onSubmit = this.onChangePassword.bind(this);
  }

  async onChangePassword(data: Record<string, string>) {
    this.text.setProps({
      text: "",
      classes: ""
    });
    const request = data as UpdatePasswordRequest;
    const action = await userController.changePassword(request);
    if (!action.success) {
      this.text.setProps({
        text: action.entity.reason,
        classes: "text_danger"
      });
    }
    if (action.success) {
      this.newPassword.input.setProps({ value: "" });
      this.oldPassword.input.setProps({ value: "" });
      this.text.setProps({
        text: "Password changed",
        classes: "text_success"
      });
    }
  }
}
