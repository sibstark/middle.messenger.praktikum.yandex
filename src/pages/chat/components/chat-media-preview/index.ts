import { renderTemplate } from "@utils";
import template from "./chat-media-preview.hbs";
import { Avatar } from "../avatar";
import { ChatMediaPreviewProps } from "./types";
import "./chat-media-preview.css";

export const ChatMediaPreview = ({
  classes,
  name,
  text,
  time,
  count
}: ChatMediaPreviewProps) => {
  const avatar = Avatar();
  return renderTemplate(template, {
    classes,
    name,
    text,
    time,
    count,
    avatar
  });
};

export * from "./types";
