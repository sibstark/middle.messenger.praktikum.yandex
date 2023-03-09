import template from "bundle-text:./modal.hbs";
import {renderTemplate} from "../../utils";
import "./modal.css";

export const Modal = ({content, externalClasses}) => {
    return renderTemplate(template, {content, externalClasses});
};