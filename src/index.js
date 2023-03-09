import {RenderLoginPage} from "./pages/login";
import {RenderRegistrationPage} from "./pages/registration";
import {RenderProfilePage} from "./pages/profile";
import {Render404Page} from "./pages/404";
import {Render500Page} from "./pages/500";
import {RenderChatPage} from "./pages/chat";
import { path } from "./pages/routes";

(function () {
    const root = document.getElementById("root");
    if (location.href.includes(path.login)) {
        root.innerHTML = RenderLoginPage();
        return;
    }
    if (location.href.includes(path.registration)) {
        root.innerHTML = RenderRegistrationPage();
        return;
    }
    if (location.href.includes(path.profile)) {
        root.innerHTML = RenderProfilePage();
        return;
    }
    if (location.href.includes(path.notFound)) {
        root.innerHTML = Render404Page();
        return;
    }
    if (location.href.includes(path.serverError)) {
        root.innerHTML = Render500Page();
        return;
    }
    if (location.href.includes(path.app)) {
        root.innerHTML = RenderChatPage();
        return;
    }
    location.href = path.notFound;
})();
