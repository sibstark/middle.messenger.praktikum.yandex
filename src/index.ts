import { path } from "@routes";
import { Router } from "@utils";
import { RenderLoginPage } from "./pages/login";
import { RenderRegistrationPage } from "./pages/registration";
import { RenderProfilePage } from "./pages/profile";
import { Render404Page } from "./pages/404";
import { Render500Page } from "./pages/500";
import { RenderChatPage } from "./pages/chat";
import { RenderNavPage } from "./pages/navigation";

const router = new Router("root");
router
  .use(path.login, RenderLoginPage)
  .use(path.registration, RenderRegistrationPage)
  .use(path.profile, RenderProfilePage)
  .use(path.notFound, Render404Page)
  .use(path.serverError, Render500Page)
  .use(path.app, RenderChatPage)
  .use(path.nav, RenderNavPage)
  .use("*", RenderNavPage);

router.start();
