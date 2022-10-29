<template>
  <div class="panel-account">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      status-icon
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" type="password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus"
import type { FormInstance, FormRules } from "element-plus"
import useLoginStore from "@/store/login"
import { reactive, ref } from "vue"

import type { IAccount } from "@/types"
import { LocalCache } from "@/utils/cache"

const CACHE_NAME = "name"
const CACHE_PASSWORD = "password"

const account = reactive<IAccount>({
  name: LocalCache.getCache(CACHE_NAME) ?? "",
  password: LocalCache.getCache(CACHE_PASSWORD) ?? ""
})

const accountRules = reactive<FormRules>({
  name: [
    { required: true, message: "必须输入帐号信息", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: "必须是6~20位数字或字母组成",
      trigger: "blur"
    }
  ],
  password: [
    { required: true, message: "必须输入密码信息", trigger: "blur" },
    {
      pattern: /^[0-9a-z]{6,}$/,
      message: "必须是6位以上数字和字母组成",
      trigger: "blur"
    }
  ]
})

const formRef = ref<FormInstance>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password
      loginStore.fetchLoginAccount({ name, password }).then(() => {
        if (isRemPwd) {
          LocalCache.setCache(CACHE_NAME, name)
          LocalCache.setCache(CACHE_PASSWORD, password)
        } else {
          LocalCache.removeCache(CACHE_NAME)
          LocalCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error("Oops, 请您输入正确的帐号和密码后再操作~~.")
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.panel-account {
  color: red;
}
</style>
