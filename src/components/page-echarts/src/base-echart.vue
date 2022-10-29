<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const echartRef = ref()
</script>

<style lang="less" scoped>
.base-echart {
  color: red;
}
.echart {
  height: 300px;
}
</style>
