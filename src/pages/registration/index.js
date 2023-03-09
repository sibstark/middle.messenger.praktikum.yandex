import {AuthorizationContainer, Page} from "../../modules";
import {FormControl, Button} from "../../components";
import {concatArrayTemplates} from "../../utils";

const controls = [{
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
}, {
    externalClasses: "authorization-container__form-control",
    label: "Confirm password",
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm password",
    inputClasses: "form-control__input_error",
    errorText: "Don't match"
}, {
    externalClasses: "authorization-container__form-control",
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Password",
    inputClasses: "form-control__input_error",
    errorText: "Don't match"
}];
export const RenderRegistrationPage = () => {
    const renderedControls = concatArrayTemplates(controls.map(control => FormControl(control)));
    const submit = Button({
        type: "submit",
        text: "Sign up",
        externalClasses: "button_blue button_full-width authorization-container__form-control"
    });

    const registrationForm = `<form action="/app" method="GET">
${renderedControls}
${submit}
</form>`
    const authorizationContainer = AuthorizationContainer({header: "Registration", form: registrationForm});
    return Page({body: authorizationContainer, externalClasses: "page_centered"});
}