import { Form, FormControl } from "@components";
import { loginValidation } from "@utils";
import { ArrowRight } from "./pages/chat/components";

const fc = new FormControl({
  title: "Login",
  name: "login",
  type: "text",
  placeholder: "Placeholder"
});

const form = new Form({
  content: [fc]
}, {
  login: loginValidation
});

const root = document.getElementById("root") as HTMLElement;

root.append(form.getContent());

setTimeout(() => {
  // fc.makeError("Required");
}, 3000);
