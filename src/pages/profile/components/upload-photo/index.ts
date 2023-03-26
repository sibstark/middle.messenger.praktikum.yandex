import { Block } from "@infrastructure";
import template from "./upload-photo.hbs";
import { UploadPhotoProps } from "./types";
import "./upload-photo.css";

export class UploadPhoto extends Block<UploadPhotoProps> {
  constructor(props: UploadPhotoProps) {
    super("div", props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
