import { FormControl, Button, EmptyFormControl, Form, Text } from "@components";
import {
  connect,
  emailValidation,
  loginValidation,
  nameValidation,
  phoneValidation
} from "@utils";
import { UpdateProfileRequest, User } from "@types";
import { connectUser } from "@connectors";
import { userController } from "@controllers";
import ProfileAvatar from "./components/avatar";

type ChangeProfileFormProps = {
  user: User | null;
};
class ChangeProfileForm extends Form {
  firstName: FormControl;

  secondName: FormControl;

  displayName: FormControl;

  login: FormControl;

  email: FormControl;

  phone: FormControl;

  text: Text;

  constructor(props: ChangeProfileFormProps) {
    const firstName = new FormControl({
      classes: "authorization-container__form-control",
      title: "First name",
      name: "first_name",
      type: "text",
      placeholder: "First name",
      value: props.user?.first_name
    });
    const secondName = new FormControl({
      classes: "authorization-container__form-control",
      title: "Second name",
      name: "second_name",
      type: "text",
      placeholder: "Second name",
      value: props.user?.second_name
    });
    const displayName = new FormControl({
      classes: "authorization-container__form-control",
      title: "Display name",
      name: "display_name",
      type: "text",
      placeholder: "Display name",
      value: props.user?.display_name
    });
    const login = new FormControl({
      classes: "authorization-container__form-control",
      title: "Login",
      name: "login",
      type: "text",
      placeholder: "Login",
      value: props.user?.login
    });
    const email = new FormControl({
      classes: "authorization-container__form-control",
      title: "Email",
      name: "email",
      type: "text",
      placeholder: "Email",
      value: props.user?.email
    });
    const phone = new FormControl({
      classes: "authorization-container__form-control",
      title: "Phone",
      name: "phone",
      type: "text",
      placeholder: "Phone",
      value: props.user?.phone
    });
    const loadPhoto = new EmptyFormControl({
      classes: "authorization-container__form-control",
      body: new ProfileAvatar()
    });

    const save = new Button({
      type: "submit",
      text: "Save",
      classes:
        "button_blue button_full-width authorization-container__form-control"
    });
    const text = new Text({
      text: ""
    });
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

    this.firstName = firstName;
    this.secondName = secondName;
    this.displayName = displayName;
    this.login = login;
    this.email = email;
    this.phone = phone;
    this.phone = phone;
    this.text = text;
  }

  protected init() {
    this.props.onSubmit = this.onChangeProfile.bind(this);
  }

  async onChangeProfile(data: Record<string, string>) {
    this.text.setProps({
      text: "",
      classes: ""
    });
    const request = data as UpdateProfileRequest;
    const action = await userController.changeProfile(request);
    if (!action.success) {
      this.text.setProps({
        text: action.entity.reason,
        classes: "text_danger"
      });
    }
    if (action.success) {
      this.text.setProps({
        text: "Profile changed",
        classes: "text_success"
      });
    }
  }
}
export default connect(connectUser)(ChangeProfileForm);
