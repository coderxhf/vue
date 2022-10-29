<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditBtnClick"
      ref="contentRef"
    />
    <page-modal :modal-config="modalConfigRfc" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="role">
import { computed } from "vue"

import PageSearch from "@/components/page-search/page-search.vue"
import PageContent from "@/components/page-content/page-content.vue"
import PageModal from "@/components/page-modal/page-modal.vue"
import searchConfig from "./config/search.config"
import contentConfig from "./config/content.config"
import modalConfig from "./config/modal.config"

import usePageContent from "@/hooks/usePageContent"
import usePageModal from "@/hooks/usePageModal"
import useMainStore from "@/store/main/main"

const modalConfigRfc = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === "parentId") {
      item.options.push(...departments)
    }
  })
  return modalConfig
})

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

const { modalRef, handleNewBtnClick, handleEditBtnClick } = usePageModal()
</script>

<style scoped></style>
