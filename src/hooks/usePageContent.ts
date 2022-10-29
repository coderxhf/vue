import { ref } from "vue"
import type pageContent from "@/components/page-content/page-content.vue"

function usePageContent() {
  const contentRef = ref<InstanceType<typeof pageContent>>()
  function handleQueryClick(formData: any) {
    contentRef.value?.fetchPageListData(formData)
  }
  function handleResetClick() {
    contentRef.value?.fetchPageListData()
  }

  return {
    contentRef,
    handleQueryClick,
    handleResetClick
  }
}

export default usePageContent
