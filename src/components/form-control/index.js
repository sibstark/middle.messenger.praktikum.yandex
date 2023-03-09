import template from "bundle-text:./form-control.hbs";
import emptyTemplate from "bundle-text:./empty-form-control.hbs";
import {renderTemplate} from "../../utils";
import "./form-control.css";

export const FormControl = ({label, externalClasses, name, type, placeholder, inputClasses, errorText}) => {
    return renderTemplate(template, {label, externalClasses, name, type, placeholder, inputClasses, errorText});
};

export const EmptyFormControl = ({content, externalClasses}) => {
    return renderTemplate(emptyTemplate, {content, externalClasses});
};