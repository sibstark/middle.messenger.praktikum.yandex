import {AuthorizationContainer, Page} from "../../modules";
import {FormControl, Button, Link} from "../../components";

export const RenderLoginPage = () => {
    const login = FormControl(
        {
            externalClasses: "authorization-container__form-control",
            label: "Login",
            name: "login",
            type: "text",
            placeholder: "Login"
        });

    const password = FormControl(
        {
            externalClasses: "authorization-container__form-control",
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "Password"
        });

    const submit = Button(
        {
            type: "submit",
            text: "Sign in",
            externalClasses: "button_blue button_full-width authorization-container__form-control"
        });

    const registrationLink = Link(
        {
            text: "Create account",
            externalClasses: "link__blue",
            href: "/registration"
        });

    const loginForm = `<form>
${login}
${password}
${submit}
${registrationLink}
</form>`
    const authorizationContainer = AuthorizationContainer({header: "Login", form: loginForm});
    return Page({body: authorizationContainer, externalClasses: "page_centered"});
}