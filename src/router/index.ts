import { createRouter, createWebHashHistory } from "vue-router"

import { LOGIN_TOKEN } from "@/global/constants"
import { LocalCache } from "@/utils/cache"
import { firstMenu } from "@/utils/map-menus"

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      path: "/login",
      component: () => import("../views/login/login.vue")
    },
    {
      path: "/main",
      name: "main",
      component: () => import("../views/main/main.vue")
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("../views/not-found/not-found.vue")
    }
  ]
})

router.beforeEach((to) => {
  const token = LocalCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith("/main") && !token) {
    return "/login"
  }

  if (to.path === "/main") {
    return firstMenu?.url
  }
})

export default router
