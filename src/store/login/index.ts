import {
  accountLoginAction,
  getUserInfoById,
  getUserMenusByRoleId
} from "@/service/login/login"
import type { IAccount } from "@/types"
import { LocalCache } from "@/utils/cache"
import { defineStore } from "pinia"
import router from "@/router"
import {
  LOGIN_TOKEN,
  LOGIN_USER_INFO,
  LOGIN_USER_MENUS
} from "@/global/constants"
import { mapMenusToPermissions, mapMenusToRoutes } from "@/utils/map-menus"
import useMainStore from "../main/main"

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore("login", {
  state: (): ILoginState => ({
    token: LocalCache.getCache(LOGIN_TOKEN) ?? "",
    userInfo: LocalCache.getCache(LOGIN_USER_INFO) ?? {},
    userMenus: LocalCache.getCache(LOGIN_USER_MENUS) ?? [],
    permissions: []
  }),
  actions: {
    async fetchLoginAccount(account: IAccount) {
      const loginRes = await accountLoginAction(account)
      const id = loginRes.data?.id
      this.token = loginRes.data?.token
      LocalCache.setCache(LOGIN_TOKEN, this.token)

      const userInfoRes = await getUserInfoById(id)
      const userInfo = userInfoRes.data
      this.userInfo = userInfo
      LocalCache.setCache(LOGIN_USER_INFO, userInfo)

      const userMenusRes = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusRes.data
      this.userMenus = userMenus

      LocalCache.setCache(LOGIN_USER_MENUS, userMenus)

      // 获取用户的按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions

      // 请求菜单,角色,部门信息
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute("main", route))
      router.push("/main")
    },
    loadLocalCacheAction() {
      const token = LocalCache.getCache(LOGIN_TOKEN)
      const userInfo = LocalCache.getCache(LOGIN_USER_INFO)
      const userMenus = LocalCache.getCache(LOGIN_USER_MENUS)

      // 请求菜单,角色,部门信息
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        //动态的添加按钮的权限
        const permissions = mapMenusToPermissions(userMenus)
        this.permissions = permissions

        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute("main", route))
      }
    }
  }
})

export default useLoginStore
