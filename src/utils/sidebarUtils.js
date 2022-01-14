export function getBaseRoute(pathname) {
    let baseRoute = pathname.split("/")[1];
    if (baseRoute === "exercises") baseRoute = "workouts";
    if (baseRoute === "auth") baseRoute = "auth/login";
    return `/${baseRoute}`;
}