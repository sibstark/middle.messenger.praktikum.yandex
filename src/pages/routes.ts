enum Path {
  login = "login",
  registration = "registration",
  profile = "profile",
  notFound = "notFound",
  serverError = "serverError",
  app = "app",
  nav = "nav"
}
export const path: Record<Path, string> = {
  [Path.login]: "/login",
  [Path.registration]: "/registration",
  [Path.profile]: "/profile",
  [Path.notFound]: "/not-found",
  [Path.serverError]: "/server-error",
  [Path.app]: "/app",
  [Path.nav]: "/"
};
