import template from "bundle-text:./authorization-container.hbs";
import {renderTemplate} from "../../utils";
import "./authorization-container.css";

export const AuthorizationContainer = ({header, form}) => {
    return renderTemplate(template, {header, form});
};
