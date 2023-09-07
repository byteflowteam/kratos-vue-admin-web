<template>
  <!--设备记录-->
  <div class="system-user-container app-container">
    <el-card shadow="always">
      <!-- 查询-->
      <el-form :model="state.queryParams" ref="queryForm" :inline="true" label-width="78px">
        <el-form-item label="名称" prop="nickname">
          <el-input placeholder="用户名称模糊查询" clearable @keyup.enter="handleQuery" style="width: 240px"
            v-model="state.queryParams.nickname" />
        </el-form-item>
        <el-form-item label="平台" prop="platform">
          <el-select v-model="state.queryParams.platform" placeholder="用户状态" clearable style="width: 240px">
            <el-option v-for="dict in sys_platform" :key="dict.dictValue" :label="dict.dictLabel"
              :value="dict.dictValue" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="state.queryParams.status" placeholder="用户状态" clearable style="width: 240px">
            <el-option v-for="dict in sys_zx" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
          </el-select>
        </el-form-item>

        <el-form-item label="时间" prop="date">
          <el-date-picker v-model="state.queryParams.date" type="daterange" start-placeholder="开始日期"
            end-placeholder="结束日期" />
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
          <span class="card-header-text">设备列表</span>
          <div>
            <!-- <el-button type="danger" plain :disabled="state.multiple" @click="handleDelete">
              <SvgIcon name="elementDelete" />
              删除
            </el-button> -->
          </div>
        </div>
      </template>
      <el-table v-loading="state.loading" :data="state.tableData.data" stripe @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column type="selection" width="45" align="center" />
        <el-table-column label="ID" align="center" key="id" prop="id" />
        <el-table-column label="账号ID" align="center" key="userId" prop="userId" />
        <el-table-column label="用户名" prop="nickname" show-overflow-tooltip></el-table-column>
        <el-table-column label="设备平台" align="center" prop="platform" />
        <el-table-column prop="deviceModel" label="设备型号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="version" label="登录版本" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ip" label="IP地址" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" align="center" key="status" :formatter="statusFormat" />
        <el-table-column prop="createTime" label="登录时间" show-overflow-tooltip>
          <template #default="scope">
            {{ dateStrFormat(scope.row?.loginTime) }}
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
                <el-button text type="primary" v-auth="'system:user:edit'" @click="putForward(scope.row)">
                  <SvgIcon name="elementEdit" />
                  退出设备登录
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
  toRefs,
  reactive,
  onMounted,
  ref,
  getCurrentInstance,
  onUnmounted,
} from "vue";

import {
  deviceList,
  deviceLogout
} from "@/api/system/equipmentRecord";


import { ElMessageBox, ElMessage } from "element-plus";
import EditModule from "./component/editModule.vue";
import { sys_zx, sys_platform } from "@/utils/dictionary";

const { proxy } = getCurrentInstance() as any;
const userFormRef = ref();
const state: any = reactive({
  tableData: {
    data: [],
    total: 0,
  },
  loading: false,
  // 岗位选项
  postOptions: [],
  // 性别状态字典
  sexOptions: [],
  // 角色选项
  roleOptions: [],
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
    nickname: undefined,
    platform: undefined,
    status: undefined,
    loginTimeStart: undefined,
    loginTimeEnd: undefined,
    date: [new Date(+new Date() - 30 * 24 * 3600 * 1000), new Date()],
  },
});


/** 查询用户列表 */
const getList = async () => {
  state.loading = true;
  state.queryParams.loginTimeStart = state.queryParams.date[0] || undefined
  state.queryParams.loginTimeEnd = state.queryParams.date[1] || undefined
  deviceList(state.queryParams).then(
    (response: any) => {
      if (response.code != 200) {
        state.loading = false;
      }
      state.tableData.data = response.data.data;
      state.tableData.total = response.data.total;
      state.loading = false;
    }
  ).catch((err) => state.loading = false);
};
// 多选框选中数据
const handleSelectionChange = (selection: any) => {
  state.ids = selection.map((item: any) => item.userId);
  state.single = selection.length != 1;
  state.multiple = !selection.length;
};
/** 搜索按钮操作 */
const handleQuery = async () => {
  // state.queryParams.pageNum = 1;
  await getList();
};
/** 重置按钮操作 */
const resetQuery = async () => {
  // 表单初始化，方法：`resetFields()` 无法使用
  state.queryParams.pageNum = 1;
  state.queryParams.pageSize = 10;
  state.queryParams.nickname = "";
  state.queryParams.platform = "";
  state.queryParams.status = "";
  state.queryParams.loginTimeStart = "";
  state.queryParams.loginTimeEnd = "";
  state.queryParams.date = [new Date(+new Date() - 30 * 24 * 3600 * 1000), new Date()];
  handleQuery();
};

// 退出设备登录
const putForward = (row: any) => {
  const userId = row.userId
  ElMessageBox({
    message: '将退出用户当前所有在线设备，请谨慎操作!',
    title: "警告",
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then(function () {
    return deviceLogout({ userId }).then(() => {
      getList();
      ElMessage.success("退出成功");
    });
  });
}


// 分页改变
const onHandleSizeChange = (val: number) => {
  console.log(val, "valvalval12345");
  state.queryParams.pageSize = val;
  handleQuery();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
  console.log(val, "valvalval");

  state.queryParams.pageNum = val;
  handleQuery();
};

// 字典状态字典翻译
const statusFormat = (row: any, column: any) => {
  return proxy.selectDictLabel(sys_zx, row.status);
};
// 页面加载时
onMounted(() => {
  getList();
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
