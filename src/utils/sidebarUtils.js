export function getBaseRoute(pathname) {
    let baseRoute = pathname.split("/")[1];
    if (baseRoute === "exercises") baseRoute = "workouts"
    return `/${baseRoute}`;
}