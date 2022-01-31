//INPUT: pathname - the pathname passed in as useLocation(). Returns the correct route to match up with sidebar values.
export function getBaseRoute(pathname) {
  let baseRoute = pathname.split("/")[1];
  if (baseRoute === "exercises") baseRoute = "workouts";
  if (baseRoute === "auth") baseRoute = "auth/login";

  // console.log("SIDEBAR BASE ROUTE: ======= ", baseRoute );
//   console.log("processed pathname: ", baseRoute);

  return `/${baseRoute}`;
}
