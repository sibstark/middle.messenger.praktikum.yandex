import { path } from "@routes";
import { RenderLoginPage } from "./pages/login";
import { RenderRegistrationPage } from "./pages/registration";
import { RenderProfilePage } from "./pages/profile";
import { Render404Page } from "./pages/404";
import { Render500Page } from "./pages/500";
import { RenderChatPage } from "./pages/chat";

/*
(function () {
  const { pathname } = window.location;
  const root = document.getElementById("root") as HTMLElement;
  if (pathname.includes(path.login)) {
    root.innerHTML = RenderLoginPage();
    return;
  }
  if (pathname.includes(path.registration)) {
    root.innerHTML = RenderRegistrationPage();
    return;
  }
  if (pathname.includes(path.profile)) {
    root.innerHTML = RenderProfilePage();
    return;
  }
  if (pathname.includes(path.notFound)) {
    root.innerHTML = Render404Page();
    return;
  }
  if (pathname.includes(path.serverError)) {
    root.innerHTML = Render500Page();
    return;
  }
  if (pathname.includes(path.app)) {
    root.innerHTML = RenderChatPage();
    return;
  }
  if (pathname === "/") {
    window.location.href = path.login;
    return;
  }
  window.location.href = path.notFound;
}());
 */
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
  }
}

render();
