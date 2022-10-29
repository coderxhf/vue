import useLoginStore from "@/store/login"

function usePermissions(permissionID: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore
  console.log("permissions", permissions)
  console.log(permissionID)
  return !!permissions.find((item) => item.includes(permissionID))
}

export default usePermissions
