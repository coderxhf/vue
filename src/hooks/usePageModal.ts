import { ref } from "vue"
import type pageModal from "@/components/page-modal/page-modal.vue"

type EditFnType = (data?: any) => void

function usePageModal(editCallBack?: EditFnType) {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  function handleNewBtnClick() {
    if (editCallBack) editCallBack()
    modalRef.value?.setModalVisible()
  }
  function handleEditBtnClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)

    if (editCallBack) editCallBack(itemData)
  }

  return { modalRef, handleNewBtnClick, handleEditBtnClick }
}

export default usePageModal
