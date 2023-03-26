import { path } from "@routes";
import { RenderLoginPage } from "./pages/login";
import { RenderRegistrationPage } from "./pages/registration";
import { RenderProfilePage } from "./pages/profile";
import { Render404Page } from "./pages/404";
import { Render500Page } from "./pages/500";
import { RenderChatPage } from "./pages/chat";
import { RenderNavPage } from "./pages/navigation";

const root = document.getElementById("root") as HTMLElement;

function render() {
  const { pathname } = window.location;
  if (pathname.includes(path.login)) {
    const page = RenderLoginPage();
    root.append(page.getContent());
    return;
  }
  if (pathname.includes(path.registration)) {
    const page = RenderRegistrationPage();
    root.append(page.getContent());
    return;
  }
  if (pathname.includes(path.profile)) {
    const page = RenderProfilePage();
    root.append(page.getContent());
    return;
  }
  if (pathname.includes(path.notFound)) {
    const page = Render404Page();
    root.append(page.getContent());
    return;
  }
  if (pathname.includes(path.serverError)) {
    const page = Render500Page();
    root.append(page.getContent());
    return;
  }
  if (pathname.includes(path.app)) {
    const page = RenderChatPage();
    root.append(page.getContent());
    return;
  }
  if (pathname === "/") {
    const page = RenderNavPage();
    root.append(page.getContent());
    return;
  }
  window.location.href = path.notFound;
}

render();
