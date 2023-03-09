import template from "bundle-text:./page.hbs";
import {renderTemplate} from "../../utils";
import "./page.css";

export const Page = ({body, externalClasses}) => {
    return renderTemplate(template, {body, externalClasses});
};