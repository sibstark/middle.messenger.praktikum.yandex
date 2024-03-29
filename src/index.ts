import { path } from "@routes";
import { Router, store, StoreEvents } from "@utils";
import { connectUser } from "@connectors";
import { authController } from "@controllers";
import { RenderLoginPage } from "./pages/login";
import { RenderRegistrationPage } from "./pages/registration";
import { RenderProfilePage } from "./pages/profile";
import { Render404Page } from "./pages/404";
import { Render500Page } from "./pages/500";
import { RenderChatPage } from "./pages/chat";

const protectedRouts = [path.profile, path.serverError, path.app];
const router = new Router("root");

function protectedRoute(): boolean {
  if (!router.path) {
    return false;
  }
  return protectedRouts.includes(router.path);
}

function protectRoute(pathname: string, next: Function) {
  const isProtected = protectedRouts.includes(pathname);
  const user = connectUser(store.getState());
  if (!user.user && isProtected) {
    router.go(path.login);
    return;
  }
  next();
}
window.addEventListener("DOMContentLoaded", async () => {
  store.on(StoreEvents.Updated, () => {
    const user = connectUser(store.getState());
    if (!user && protectedRoute()) {
      router.go(path.login);
    }
  });
  router
    .use(path.login, RenderLoginPage)
    .use(path.registration, RenderRegistrationPage)
    .use(path.profile, RenderProfilePage)
    .use(path.notFound, Render404Page)
    .use(path.serverError, Render500Page)
    .use(path.app, RenderChatPage)
    .use("*", Render404Page);

  router.on(protectRoute);

  const action = await authController.fetchUser();
  router.start();
  if (!action.success && protectedRoute()) {
    router.go(path.login);
  }
  if (action.success && action.entity.id) {
    router.go(path.app);
  }
});
