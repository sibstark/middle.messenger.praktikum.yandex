/* eslint-disable max-len */
import { AuthorizationContainer, Page } from "@modules";
import {
  FormControl,
  Button,
  EmptyFormControl,
  Modal,
  FormControlProps,
  Main,
  Form,
  Link
} from "@components";
import {
  emailValidation,
  loginValidation,
  nameValidation,
  newPasswordPassValidation,
  passValidation,
  phoneValidation
} from "@utils";
import { UploadPhoto } from "./components";

const updateProfileControls: FormControlProps[] = [
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
    title: "Display name",
    name: "display_name",
    type: "text",
    placeholder: "Display name"
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
  }
];

const changePassControls: FormControlProps[] = [
  {
    classes: "authorization-container__form-control",
    title: "Old password",
    name: "oldPassword",
    type: "password",
    placeholder: "Old password"
  },
  {
    classes: "authorization-container__form-control",
    title: "New password",
    name: "newPassword",
    type: "password",
    placeholder: "New password"
  }
];

const loadPhotoContent = `
<svg class="form-control__image" width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="65" cy="65" r="65" fill="#EFEFEF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M81 47H49C47.8954 47 47 47.8954 47 49V70.2667L59.6547 67.3139C60.5486 67.1053 61.4635 67 62.3814 67H67.6186C68.5365 67 69.4514 67.1053 70.3453 67.3139L83 70.2667V49C83 47.8954 82.1046 47 81 47ZM49 45C46.7909 45 45 46.7909 45 49V81C45 83.2091 46.7909 85 49 85H81C83.2091 85 85 83.2091 85 81V49C85 46.7909 83.2091 45 81 45H49ZM55.9091 59.5455C57.9174 59.5455 59.5455 57.9174 59.5455 55.9091C59.5455 53.9008 57.9174 52.2727 55.9091 52.2727C53.9008 52.2727 52.2728 53.9008 52.2728 55.9091C52.2728 57.9174 53.9008 59.5455 55.9091 59.5455Z" fill="#CDCDCD"/>
</svg>
<input type="file" name="avatar" style="display: none" />`;

export const RenderProfilePage = () => {
  const loadPhoto = new EmptyFormControl({
    classes: "authorization-container__form-control",
    body: loadPhotoContent
  });
  const updateControls = updateProfileControls.map(
    control => new FormControl(control)
  );
  const passwordControls = changePassControls.map(
    control => new FormControl(control)
  );

  const save = new Button({
    type: "submit",
    text: "Save",
    classes:
      "button_blue button_full-width authorization-container__form-control"
  });

  const changePass = new Button({
    type: "submit",
    text: "Change password",
    classes:
      "button_blue button_full-width authorization-container__form-control"
  });
  const selectFileButton = new Button({
    type: "button",
    text: "Select a file",
    classes: "button_link"
  });
  const uploadPhoto = new UploadPhoto({ content: selectFileButton });
  const updatePhotoModal = new Modal({ content: uploadPhoto });

  const updateForm = new Form(
    {
      content: [loadPhoto, ...updateControls, save],
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

  const toChatLink = new Link({
    text: "Back to chat",
    classes: "link__blue",
    href: "/app"
  });

  const passwordForm = new Form(
    {
      content: [...passwordControls, changePass, updatePhotoModal, toChatLink],
      name: "change_password"
    },
    {
      oldPassword: passValidation,
      newPassword: newPasswordPassValidation
    }
  );

  const container = new AuthorizationContainer({
    header: "Profile",
    body: [updateForm, passwordForm]
  });

  const main = new Main({
    body: container
  });

  return new Page({
    body: main,
    classes: "page_centered"
  });
};
