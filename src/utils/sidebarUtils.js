//INPUT: pathname - the pathname passed in as useLocation(). Returns the correct route to match up with sidebar values.
export function getBaseRoute(pathname) {
  // let baseRoute = "";
  // if (pathname.includes("?")) {
  //     baseRoute = pathname.split("?")[0].split("/")[1];
  //     console.log("process pathname: ", pathname);
  // }
  let baseRoute = pathname.split("/")[1];
  if (baseRoute === "exercises") baseRoute = "workouts";
  if (baseRoute === "auth") baseRoute = "auth/login";

//   console.log("processed pathname: ", baseRoute);

  return `/${baseRoute}`;
}
