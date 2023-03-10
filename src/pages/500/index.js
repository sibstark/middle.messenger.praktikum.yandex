import {ErrorContainer, Page} from "../../modules";

export const Render500Page = () => {
    const errorContainer = ErrorContainer({
        body: "Something went wrong",
        code: 500,
        externalClasses: "error-container_danger"
    });
    return Page({body: `<main>${errorContainer}</main>`, externalClasses: "page_centered"});
}
