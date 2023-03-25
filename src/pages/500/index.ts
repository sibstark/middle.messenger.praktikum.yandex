import { ErrorContainer, Page } from "@modules";
import { Main } from "@components";

export const Render500Page = () => {
  const container = new ErrorContainer({
    body: "Something went wrong",
    code: 500,
    classes: "error-container_danger"
  });
  const main = new Main({
    body: container
  });
  return new Page({
    body: main,
    classes: "page_centered"
  });
};
