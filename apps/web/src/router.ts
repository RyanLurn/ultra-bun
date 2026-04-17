import { NotFound } from "@repo/ui/components/pages/not-found";
import { createRouter } from "@tanstack/react-router";

import { routeTree } from "@/routeTree.gen";

export function getRouter() {
  const router = createRouter({
    defaultNotFoundComponent: NotFound,
    scrollRestoration: true,
    routeTree,
  });

  return router;
}
