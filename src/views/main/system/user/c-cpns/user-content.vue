<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :border="true" :data="usersList" style="width: 100%">
        <el-table-column align="center" type="selection" width="60" />
        <el-table-column align="center" type="index" label="序号" width="60" />
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
          width="150"
        />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="150"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="手机号码"
          width="150"
        />
        <el-table-column align="center" prop="enable" label="状态" width="100">
          <template #default="scope">
            <el-button
              size="small"
              :type="scope.row.enable ? 'primary' : 'danger'"
              plain
            >
              {{ scope.row.enable ? "启用" : "禁用" }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createAt"
          label="创建时间"
          width="180"
        >
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="updateAt"
          label="更新时间"
          width="180"
        >
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template #default="scope">
            <el-button
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="handleEditBtnClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="handleDeleteBtnClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handlePagSizeChange"
        @current-change="handlePagCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from "pinia"

import useSystemStore from "@/store/main/system/system"
import { formatUTC } from "@/utils/format"

const emit = defineEmits(["newClick", "editClick"])

const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchUsersListData()
const { usersList, usersTotalCount } = storeToRefs(systemStore)

function handlePagSizeChange() {
  fetchUsersListData()
}
function handlePagCurrentChange() {
  fetchUsersListData()
}

// 请求数据
function fetchUsersListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUsersListAction(queryInfo)
}
// 新建数据
function handleNewUserClick() {
  emit("newClick")
}
// 修改数据
function handleEditBtnClick(itemData: any) {
  emit("editClick", itemData)
}
// 删除数据
function handleDeleteBtnClick(id: number) {
  systemStore.deleteUsersByIdAction(id)
}
defineExpose({ fetchUsersListData })
</script>

<style lang="less" scoped>
.user-content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
