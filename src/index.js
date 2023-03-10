import {RenderLoginPage} from "./pages/login";
import {RenderRegistrationPage} from "./pages/registration";
import {RenderProfilePage} from "./pages/profile";
import {Render404Page} from "./pages/404";
import {Render500Page} from "./pages/500";
import {RenderChatPage} from "./pages/chat";
import {path} from "./pages/routes";

(function () {
    const pathname = location.pathname;
    const root = document.getElementById("root");
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
        location.href = path.login;
        return;
    }
    location.href = path.notFound;
})();
