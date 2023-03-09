import template from "bundle-text:./form-control.hbs";
import { renderTemplate } from "../../utils/index.js";
import "./form-control.css";
export const FormControl = ({ label, externalClasses, name, type, placeholder, inputClasses, errorText }) => {
    return renderTemplate(template,{ label, externalClasses, name, type, placeholder, inputClasses, errorText });
};