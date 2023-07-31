import { lazy } from "solid-js";
import { RouteDefinition } from "@solidjs/router";

export const router: RouteDefinition[] = [
  {
    path: "/my",
    component: lazy(() => import("../components/globals/LayoutPrivate")),
    children: [
      {
        path: "/profile",
        component: lazy(() => import("../pages/profile/index")),
      },
      {
        path: "/write",
        component: lazy(() => import("../pages/write")),
      },
      {
        path: "/history",
        component: lazy(() => import("../pages/profile/history")),
      },
      {
        path: "/about",
        component: lazy(() => import("../pages/profile/about")),
      },
    ],
  },
  {
    path: "/",
    component: lazy(() => import("../components/globals/LayoutPublic")),
    children: [
      {
        path: "/read/:id",
        component: lazy(() => import("../pages/story/[read]")),
      },
      {
        path: "/",
        component: lazy(() => import("../pages/home")),
      },
      {
        path: "/room",
        component: lazy(() => import("../pages/room")),
      },
      {
        path: "/setting",
        component: lazy(() => import("../pages/setting")),
      },
    ],
  },
  {
    path: "*",
    component: lazy(() => import("../pages/404")),
  },
];
