import {ErrorContainer, Page} from "../../modules";

export const Render404Page = () => {
    const errorContainer = ErrorContainer({body: "Not found", code: 404});
    return Page({body: errorContainer, externalClasses: "page_centered"});
}