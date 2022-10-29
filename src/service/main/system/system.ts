import hyRequest from "@/service"

// 针对user页面的网络请求
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: "/users/list",
    data: queryInfo
  })
}

export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}

export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: "/users",
    data: userInfo
  })
}

export function editUserData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

// 关于page页面的网络请求
export function postPageListData(pageName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageById(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`
  })
}

export function newPageData(pageName: string, userInfo: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: userInfo
  })
}

export function editPageData(pageName: string, id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: userInfo
  })
}
