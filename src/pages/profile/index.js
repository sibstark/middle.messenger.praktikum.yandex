import {AuthorizationContainer, Page} from "../../modules";
import {FormControl, Button, EmptyFormControl, Modal} from "../../components";
import {concatArrayTemplates} from "../../utils";
import {UploadPhoto} from "./components";

const updateProfileControls = [{
    externalClasses: "authorization-container__form-control",
    label: "First name",
    name: "first_name",
    type: "text",
    placeholder: "First name"
}, {
    externalClasses: "authorization-container__form-control",
    label: "Second name",
    name: "second_name",
    type: "text",
    placeholder: "Second name"
}, {
    externalClasses: "authorization-container__form-control",
    label: "Display name",
    name: "display_name",
    type: "text",
    placeholder: "Display name"
}, {
    externalClasses: "authorization-container__form-control",
    label: "Login",
    name: "login",
    type: "text",
    placeholder: "Login"
}, {
    externalClasses: "authorization-container__form-control",
    label: "Email",
    name: "email",
    type: "text",
    placeholder: "Email"
}, {
    externalClasses: "authorization-container__form-control",
    label: "Phone",
    name: "phone",
    type: "text",
    placeholder: "Phone",
    inputClasses: "form-control__input_error",
    errorText: "Required"
}];

const changePassControls = [{
    externalClasses: "authorization-container__form-control",
    label: "Old password",
    name: "oldPassword",
    type: "password",
    placeholder: "Old password",
    inputClasses: "form-control__input_error",
    errorText: "Don't match"
}, {
    externalClasses: "authorization-container__form-control",
    label: "New password",
    name: "newPassword",
    type: "password",
    placeholder: "New password",
    inputClasses: "form-control__input_error",
    errorText: "Don't match"
}];
export const RenderProfilePage = () => {
    const loadPhotoContent = `
<svg class="form-control__image" width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="65" cy="65" r="65" fill="#EFEFEF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M81 47H49C47.8954 47 47 47.8954 47 49V70.2667L59.6547 67.3139C60.5486 67.1053 61.4635 67 62.3814 67H67.6186C68.5365 67 69.4514 67.1053 70.3453 67.3139L83 70.2667V49C83 47.8954 82.1046 47 81 47ZM49 45C46.7909 45 45 46.7909 45 49V81C45 83.2091 46.7909 85 49 85H81C83.2091 85 85 83.2091 85 81V49C85 46.7909 83.2091 45 81 45H49ZM55.9091 59.5455C57.9174 59.5455 59.5455 57.9174 59.5455 55.9091C59.5455 53.9008 57.9174 52.2727 55.9091 52.2727C53.9008 52.2727 52.2728 53.9008 52.2728 55.9091C52.2728 57.9174 53.9008 59.5455 55.9091 59.5455Z" fill="#CDCDCD"/>
</svg>
<input type="file" name="avatar" style="display: none" />`;

    const loadPhoto = EmptyFormControl({
        externalClasses: "authorization-container__form-control",
        content: loadPhotoContent
    });
    const renderedUpdateControls = concatArrayTemplates(updateProfileControls.map(control => FormControl(control)));
    const renderedChangePassControls = concatArrayTemplates(changePassControls.map(control => FormControl(control)));

    const save = Button({
        type: "submit",
        text: "Save",
        externalClasses: "button_blue button_full-width authorization-container__form-control"
    });

    const changePass = Button({
        type: "submit",
        text: "Change password",
        externalClasses: "button_blue button_full-width authorization-container__form-control"
    });
    const selectFileButton = Button({
        type: "button",
        text: "Select a file",
        externalClasses: "button_link"
    });
    const uploadPhotoContent = UploadPhoto({content: selectFileButton});

    const updatePhotoModal = Modal({content: uploadPhotoContent});

    const profileForm = `<form action="/app" method="GET">
${loadPhoto}
${renderedUpdateControls}
${save}
</form>
<form action="/app" method="GET">
${renderedChangePassControls}
${changePass}
${updatePhotoModal}
</form>
`
    const authorizationContainer = AuthorizationContainer({header: "Profile", form: profileForm});
    return Page({body: authorizationContainer, externalClasses: "page_centered"});
}