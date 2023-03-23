import { Button1 } from "@components";

const button = new Button1({
  classes: "classes112",
  type: "submit",
  text: "my button",
  events: {
    click: () => {
      console.log("clicked");
    }
  }
});

const root = document.getElementById("root") as HTMLElement;
root.append(button.getContent());
