<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item in breadCrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from "@/store/login"
import { computed } from "vue"
import { useRoute } from "vue-router"
import { mapPathToBreadcrumbs } from "@/utils/map-menus"

const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

const route = useRoute()
const breadCrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus)
})
</script>

<style lang="less" scoped>
.header-crumb {
  color: red;
}
</style>
