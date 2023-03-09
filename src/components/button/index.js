import template from "bundle-text:./button.hbs";
import {renderTemplate} from "../../utils/index.js";
import "./button.css";

export const Button = ({type, externalClasses, text}) => {
    return renderTemplate(template, {type, externalClasses, text});
};