<template>
  <div class="login-panel">
    <h1 class="title">弘源后台管理系统</h1>

    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <panel-account ref="accountRef" />
        </el-tab-pane>

        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <panel-phone></panel-phone>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="controls">
      <el-checkbox label="记住密码" v-model="isRemPwd" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button
      class="login-btn"
      size="large"
      type="primary"
      @click="handleLoginBtnClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import PanelAccount from "./panel-account.vue"
import PanelPhone from "./panel-phone.vue"
import { ref, watch } from "vue"
import { LocalCache } from "@/utils/cache"

const activeName = ref("account")
const accountRef = ref<InstanceType<typeof PanelAccount>>()
const isRemPwd = ref<boolean>(LocalCache.getCache("isRemPwd") ?? false)

watch(isRemPwd, (newValue) => {
  LocalCache.setCache("isRemPwd", newValue)
})

function handleLoginBtnClick() {
  if (activeName.value === "account") {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log("正在进行手机登录")
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      margin-left: 5px;
    }
  }
  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
