import type { RouteRecordRaw } from "vue-router"

function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []

  const files: Record<string, any> = import.meta.glob(
    "../router/main/**/*.ts",
    {
      eager: true
    }
  )
  for (const k in files) {
    const module = files[k]
    localRoutes.push(module.default)
  }

  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  const localRoutes = loadLocalRoutes()
  // 创建一个空白的数组用来存储路由信息
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    let isFirst: boolean = true
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 给菜单加装重定向功能,没有相应的二级路由页面的时候,直接重定向到三级页面
        if (isFirst && !routes.find((item) => item.path === menu.url)) {
          isFirst = false
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

// 根据当前的路径获取相应的菜单中id
export function mapPathToMenus(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

interface IBreadcrumbs {
  name: string
  path: string
}

export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadCrumbs: IBreadcrumbs[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadCrumbs.push({ name: menu.name, path: menu.url })
        breadCrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadCrumbs
}

export function mapMenuListToIDs(menuList: any[]) {
  const ids: number[] = []
  function recurseGetId(menus: any) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)

  return ids
}

export function mapMenusToPermissions(menuList: any) {
  const permissions: string[] = []
  console.log("menuList", menuList)
  function recurseGetPermissions(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermissions(item.children ?? [])
      }
    }
  }
  recurseGetPermissions(menuList)

  return permissions
}
