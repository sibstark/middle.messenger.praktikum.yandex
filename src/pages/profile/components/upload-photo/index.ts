import { Button } from "@components";
import { renderTemplate } from "@utils";
import template from "./upload-photo.hbs";
import { UploadPhotoProps } from "./types";
import "./upload-photo.css";

export const UploadPhoto = ({ content }: UploadPhotoProps) => {
  const button = Button({
    type: "button",
    text: "Save",
    classes: "button_blue button_full-width"
  });
  return renderTemplate(template, { button, content });
};
