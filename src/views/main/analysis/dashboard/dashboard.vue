<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template>
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <count-card />
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import CountCard from "./c-cpns/count-card/count-card.vue"
</script>

<style scoped>
.el-row {
  margin-bottom: 10px;
}
</style>
