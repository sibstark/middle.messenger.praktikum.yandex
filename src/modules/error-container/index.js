import template from "bundle-text:./error-container.hbs";
import {renderTemplate} from "../../utils";
import {Link} from "../../components";
import "./error-container.css";

export const ErrorContainer = ({externalClasses, code, body}) => {
    const link = Link({href: "/app", text: "Back to chat", externalClasses: "link__blue"});
    return renderTemplate(template, {externalClasses, code, body, link});
};