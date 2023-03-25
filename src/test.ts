import {
  Button, Link, RoundPill, Form, FormControl
} from "@components";
import { ArrowRight } from "./pages/chat/components";

const fc = new FormControl({
  title: "Login",
  name: "login",
  type: "text",
  placeholder: "Placeholder",
  events: {
    focus: () => console.log("focus"),
    blur: () => console.log("blur")
  }
});

const form = new Form({
  content: fc
});

const root = document.getElementById("root") as HTMLElement;

root.append(form.getContent());

setTimeout(() => {
  fc.makeError("Required");
}, 3000);
