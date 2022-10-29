import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUsersListData
} from "@/service/main/system/system"
import { defineStore } from "pinia"
import useMainStore from "../main"

import type { ISystemState } from "./type"

const useSystemStore = defineStore("system", {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListRes = await postUsersListData(queryInfo)
      console.log(usersListRes)
      const { totalCount, list } = usersListRes.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUsersByIdAction(id: number) {
      const deleteRes = await deleteUserById(id)
      console.log(deleteRes)

      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      const editRes = await editUserData(id, userInfo)
      console.log(editRes)

      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      const newRes = await newUserData(userInfo)
      console.log(newRes)

      this.postUsersListAction({ offset: 0, size: 10 })
    },
    // 关于页面的封装的数据
    async postPageListAction(pageName: string, queryInfo: any) {
      const usersListRes = await postPageListData(pageName, queryInfo)
      console.log(usersListRes)
      const { totalCount, list } = usersListRes.data
      this.pageTotalCount = totalCount
      this.pageList = list
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteRes = await deletePageById(pageName, id)
      console.log(deleteRes)

      this.postPageListAction(pageName, { offset: 0, size: 10 })

      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, userInfo: any) {
      const editRes = await editPageData(pageName, id, userInfo)
      console.log(editRes)

      this.postPageListAction(pageName, { offset: 0, size: 10 })

      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, userInfo: any) {
      const newRes = await newPageData(pageName, userInfo)
      console.log(newRes)

      this.postPageListAction(pageName, { offset: 0, size: 10 })

      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})

export default useSystemStore
