import { ErrorContainer, Page } from "@modules";

export const Render500Page = () => {
  const errorContainer = ErrorContainer({
    body: "Something went wrong",
    code: 500,
    classes: "error-container_danger"
  });
  return Page({
    body: `<main>${errorContainer}</main>`,
    classes: "page_centered"
  });
};
