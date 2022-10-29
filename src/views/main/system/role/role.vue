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
    <page-modal
      :modal-config="modalConfig"
      :other-info="otherInfo"
      ref="modalRef"
    >
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ label: 'name', children: 'children' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="role">
import { nextTick, ref } from "vue"
import { storeToRefs } from "pinia"
import type { ElTree } from "element-plus"

import PageSearch from "@/components/page-search/page-search.vue"
import PageContent from "@/components/page-content/page-content.vue"
import PageModal from "@/components/page-modal/page-modal.vue"
import searchConfig from "./config/search.config"
import contentConfig from "./config/content.config"
import modalConfig from "./config/modal.config"

import usePageContent from "@/hooks/usePageContent"
import usePageModal from "@/hooks/usePageModal"
import useMainStore from "@/store/main/main"
import { mapMenuListToIDs } from "@/utils/map-menus"

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

const { modalRef, handleNewBtnClick, handleEditBtnClick } =
  usePageModal(editCallBack)

const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}

const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallBack(itemData?: any) {
  nextTick(() => {
    if (itemData) {
      const menuIds = mapMenuListToIDs(itemData.menuList)
      treeRef.value?.setCheckedKeys(menuIds)
    } else {
      treeRef.value?.setCheckedKeys([])
    }
  })
}
</script>

<style scoped></style>
