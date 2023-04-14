/* eslint-disable max-len */
import { FormControl, Button, EmptyFormControl, Form, Text } from "@components";
import {
  connect,
  connectUser,
  emailValidation,
  loginValidation,
  nameValidation,
  phoneValidation
} from "@utils";
import { User } from "@types";
import { loadPhotoContent } from "./content";

class ChangeProfileForm extends Form {
  constructor(props: User) {
    const firstName = new FormControl({
      classes: "authorization-container__form-control",
      title: "First name",
      name: "first_name",
      type: "text",
      placeholder: "First name",
      value: props.first_name
    });
    const secondName = new FormControl({
      classes: "authorization-container__form-control",
      title: "Second name",
      name: "second_name",
      type: "text",
      placeholder: "Second name",
      value: props.second_name
    });
    const displayName = new FormControl({
      classes: "authorization-container__form-control",
      title: "Display name",
      name: "display_name",
      type: "text",
      placeholder: "Display name",
      value: props.display_name
    });
    const login = new FormControl({
      classes: "authorization-container__form-control",
      title: "Login",
      name: "login",
      type: "text",
      placeholder: "Login",
      value: props.login
    });
    const email = new FormControl({
      classes: "authorization-container__form-control",
      title: "Email",
      name: "email",
      type: "text",
      placeholder: "Email",
      value: props.email
    });
    const phone = new FormControl({
      classes: "authorization-container__form-control",
      title: "Phone",
      name: "phone",
      type: "text",
      placeholder: "Phone",
      value: props.phone
    });
    const loadPhoto = new EmptyFormControl({
      classes: "authorization-container__form-control",
      body: loadPhotoContent
    });

    const save = new Button({
      type: "submit",
      text: "Save",
      classes:
        "button_blue button_full-width authorization-container__form-control"
    });
    /*
    const selectFileButton = new Button({
      type: "button",
      text: "Select a file",
      classes: "button_link"
    });
    */
    const text = new Text({
      text: ""
    });
    // const uploadPhoto = new UploadPhoto({ content: selectFileButton });
    // const updatePhotoModal = new Modal({ content: uploadPhoto });
    const content = [
      loadPhoto,
      firstName,
      secondName,
      displayName,
      login,
      email,
      phone,
      text,
      save
    ];
    super(
      {
        content,
        name: "update_profile"
      },
      {
        first_name: nameValidation,
        second_name: nameValidation,
        display_name: nameValidation,
        login: loginValidation,
        email: emailValidation,
        phone: phoneValidation
      }
    );
  }
}
export default connect(connectUser)(ChangeProfileForm);
