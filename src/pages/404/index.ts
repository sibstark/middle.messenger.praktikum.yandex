import { ErrorContainer, Page } from "@modules";
import { Main } from "@components";

export const Render404Page = () => {
  const container = new ErrorContainer({ body: "Not found", code: 404 });
  const main = new Main({
    body: container
  });
  return new Page({
    body: main,
    classes: "page_centered"
  });
};
