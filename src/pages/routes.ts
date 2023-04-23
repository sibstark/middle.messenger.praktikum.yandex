enum Path {
  login = "login",
  registration = "registration",
  profile = "profile",
  notFound = "notFound",
  serverError = "serverError",
  app = "app"
}
export const path: Record<Path, string> = {
  [Path.login]: "/",
  [Path.registration]: "/sign-up",
  [Path.profile]: "/settings",
  [Path.notFound]: "/not-found",
  [Path.serverError]: "/server-error",
  [Path.app]: "/messenger"
};
