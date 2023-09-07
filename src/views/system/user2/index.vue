<template>
  <!--账号列表-->
  <div class="system-user-container app-container">
    <el-card shadow="always">
      <!-- 查询-->
      <el-form :model="state.queryParams" ref="queryForm" :inline="true" label-width="78px">
        <el-form-item label="名称" prop="keyword">
          <el-input placeholder="用户名称模糊查询" clearable @keyup.enter="handleQuery" style="width: 240px"
            v-model="state.queryParams.keyword" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="state.queryParams.status" placeholder="状态" clearable style="width: 240px">
            <el-option v-for="dict in state.statusOptions" :key="dict.dictValue" :label="dict.dictLabel"
              :value="dict.dictValue" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="handleQuery">
            <SvgIcon name="elementSearch" />
            搜索
          </el-button>
          <el-button @click="resetQuery">
            <SvgIcon name="elementRefresh" />
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 操作按钮 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="card-header-text">账号列表</span>
          <div>
            <el-button type="primary" plain @click="handleAdd">
              <SvgIcon name="elementPlus" />
              新增
            </el-button>
            <el-button type="danger" plain :disabled="state.multiple" @click="handleDelete">
              <SvgIcon name="elementDelete" />
              删除
            </el-button>
            <!-- <el-button type="warning" plain @click="handleExport">
              <SvgIcon name="elementDownload" />
              导出
            </el-button> -->
          </div>
        </div>
      </template>
      <el-table v-loading="state.loading" :data="state.tableData.data" stripe @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column type="selection" width="45" align="center" />
        <el-table-column label="ID" align="center" key="id" prop="id" />
        <el-table-column label="名称" prop="nickName" show-overflow-tooltip />
        <el-table-column label="账号" prop="username" show-overflow-tooltip />
        <el-table-column label="谷歌密钥" prop="word" show-overflow-tooltip />
        <el-table-column label="角色" prop="roleId" align="center" />
        <!-- <el-table-column label="状态" align="center" prop="status" :formatter="sexFormat" /> -->
        <el-table-column label="状态" align="center" key="status">
          <template #default="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"
              @click="handleStatusChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="最后登录时间" show-overflow-tooltip>
          <template #default="scope">
            {{ dateStrFormat(scope.row?.createTime ) }}
          </template>
        </el-table-column>
        <el-table-column prop="path" align="center" label="操作">
          <template #default="scope">
            <el-popover placement="left">
              <template #reference>
                <el-button type="primary" circle>
                  <SvgIcon name="elementStar" />
                </el-button>
              </template>
              <div>
                <el-button text type="primary" v-auth="'system:user:edit'" @click="handleUpdate(scope.row)">
                  <SvgIcon name="elementEdit" />
                  编辑
                </el-button>
              </div>
              <div>
                <el-button text type="primary" v-auth="'system:user:delete'" @click="handleDelete(scope.row)">
                  <SvgIcon name="elementDelete" />
                  删除
                </el-button>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="state.tableData.total > 0">
        <el-divider></el-divider>
        <el-pagination background :total="state.tableData.total" :page-sizes="[10, 20, 30]"
          :current-page="state.queryParams.pageNum" :page-size="state.queryParams.pageSize"
          layout="total, sizes, prev, pager, next, jumper" @size-change="onHandleSizeChange"
          @current-change="onHandleCurrentChange" />
      </div>
    </el-card>


    <!-- 添加或修改参数配置对话框 -->
    <EditModule ref="userFormRef" :title="state.title" />

  </div>
</template>

<script lang="ts" setup>
import {
  reactive,
  onMounted,
  ref,
  getCurrentInstance,
  onUnmounted,
} from "vue";

import {
  sensitiveList,
  sensitiveUpdate,
  sensitiveDelete
} from "@/api/sensitiveWordManagement/sensitiveWordList";

import { ElMessageBox, ElMessage } from "element-plus";
import EditModule from "./component/editModule.vue";
import { handleFileError } from "@/utils/export";
import { sys_enable_disable } from "@/utils/dictionary";

const { proxy } = getCurrentInstance() as any;
const userFormRef = ref();
const state: any = reactive({
  tableData: {
    data: [],
    total: 0,
  },
  loading: false,
  // 性别状态字典
  sexOptions: [],
  // 状态数据字典
  statusOptions: [],
  // 非单个禁用
  single: true,
  // 非多个禁用
  multiple: true,
  // 选中数组
  ids: [],
  // 弹出层标题
  title: "",
  // 查询参数
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    keyword: undefined,
    status: undefined,
  },
});


/** 查询列表 */
const getList = async () => {
  state.loading = true;
  sensitiveList(state.queryParams).then(
    (response: any) => {
      if (response.code != 200) {
        state.loading = false;
      }
      state.tableData.data = response.data.data;
      state.tableData.total = response.data.total;
      state.loading = false;
    }
  );
};
// 多选框选中数据
const handleSelectionChange = (selection: any) => {
  state.ids = selection.map((item: any) => item.id);
  state.single = selection.length != 1;
  state.multiple = !selection.length;
};
/** 搜索按钮操作 */
const handleQuery = async () => {
  state.queryParams.pageNum = 1;
  await getList();
};
/** 重置按钮操作 */
const resetQuery = async () => {
  // 表单初始化，方法：`resetFields()` 无法使用
  state.queryParams.pageNum = 1;
  state.queryParams.pageSize = 10;
  state.queryParams.keyword = "";
  state.queryParams.status = "";
  handleQuery();
};
/** 新增按钮操作 */
const handleAdd = () => {
  state.title = "新增账号";
  userFormRef.value.openDialog({});
};
/** 修改按钮操作 */
const handleUpdate = (row: any) => {
  state.title = "编辑账号";
  userFormRef.value.openDialog(row);
};

// 用户状态修改
const handleStatusChange = (row: any) => {
  let text = row.status === 1 ? "禁用" : "启用";
  ElMessageBox({
    title: "警告",
    message: '确认要"' + text + '""' + row.word + '"账号吗?',
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    beforeClose: (action: string, instance: any, done: any) => {
      if (action === "confirm") {
        return sensitiveUpdate({
          id: row.id,
          status: row.status,
          word: row.word
        }).then(() => {
          ElMessage.success(text + "成功");
          done();
        });
      } else {
        done();
      }
    },
  }).catch(() => {
    row.status = row.status === 1 ? 0 : 1;
  });
};
/** 删除按钮操作 */
const handleDelete = (row: any) => {
  const ids = row.id || state.ids;
  ElMessageBox({
    message: '是否确认删除id为"' + ids + '"的数据项?',
    title: "警告",
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then(function () {
    return sensitiveDelete(ids).then(() => {
      getList();
      ElMessage.success("删除成功");
    });
  });
};

// 分页改变
const onHandleSizeChange = (val: number) => {
  state.queryParams.pageSize = val;
  handleQuery();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
  state.queryParams.pageNum = val;
  handleQuery();
};

/** 导出按钮操作 */
const handleExport = () => {
  const queryParams = state.queryParams;
  let data: any = new Date().getTime() / 1000
  let time = parseInt(data) + '';
  queryParams.filename = "用户表_" + time + ".xlsx"
  ElMessageBox({
    message: "是否确认导出所有用户数据项?",
    title: "警告",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(function () {
      // return exportUser(queryParams);
    })
    .then((response: any) => {
      handleFileError(response, queryParams.filename)
    });
};
// 字典状态字典翻译
const sexFormat = (row: any, column: any) => {
  return proxy.selectDictLabel(state.sexOptions, row.sex);
};
// 页面加载时
onMounted(() => {
  getList();
  // 查询显示状态数据字典
  state.statusOptions = sys_enable_disable
  proxy.mittBus.on("onEditUserModule", (res: any) => {
    handleQuery();
  });
});

// 页面卸载时
onUnmounted(() => {
  proxy.mittBus.off("onEditUserModule");
});
</script>

<style scoped lang="scss">
.system-user-container {
  .system-user-search {
    text-align: left;

    .system-user-search-btn {
      text-align: center;
      margin-left: 70px;
    }
  }

  .system-user-photo {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }
}
</style>
