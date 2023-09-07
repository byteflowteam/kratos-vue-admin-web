<template>
  <div class="system-menu-container">
    <el-dialog :title="state.title" v-model="state.isShowDialog" width="769px" center>
      <div v-drag="['.app-container .el-dialog', '.app-container .el-dialog__header']"></div>
      <el-form ref="roleFormRef" :model="state.ruleForm" :rules="state.ruleRules" label-width="120px"
        label-position="right">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="state.ruleForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="state.ruleForm.status">
            <el-radio v-for="dict in sys_enable_disable" :key="dict.dictValue" :label="dict.dictValue">{{ dict.dictLabel
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限设置">
          <el-tabs v-model="state.activeName">
            <el-tab-pane label="菜单权限" name="first">
              <el-checkbox v-model="state.menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">展开/折叠
              </el-checkbox>
              <el-checkbox v-model="state.menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')">全选/全不选
              </el-checkbox>
              <el-tree class="tree-border" :data="state.menuOptions" show-checkbox ref="menuRef" node-key="menuId"
                empty-text="加载中，请稍后" :props="{ label: 'menuName', children: 'children', }"
                :default-checked-keys="state.menuCheckedKeys"> </el-tree>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="state.ruleForm.remark" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel">取 消</el-button>
          <el-button type="primary" :loading="state.loading" @click="onSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, unref, getCurrentInstance } from "vue";
// 二维码组件
import twoDimensionalCode from "@/components/twoDimensionalCode/index.vue"
import { sys_enable_disable } from "@/utils/dictionary";

import { updateUser, addUser, getUser, userSecret } from "@/api/system/user";

import { treeselect as menuTreeselect } from "@/api/system/menu";

import { ElMessage } from "element-plus";

const props = defineProps({
  title: {
    type: String,
    default: () => "",
  },
})

const { proxy } = getCurrentInstance() as any;
const ruleFormRef = ref<HTMLElement | null>(null);
const state = reactive({
  // 是否显示弹出层
  isShowDialog: false,
  activeName: 'first',
  loading: false,
  menuOptions: [],
  ruleForm: {
    roleName: "",
    status: "",
    remark: "",
  },
  ruleRules: {   // 表单校验
    word: [
      { required: true, message: "敏感词不能为空", trigger: "blur" },
    ],
  },
})

// 查询菜单树结构 
const getMenuTreeselect = () => {
  menuTreeselect().then((response) => {
    state.menuOptions = response?.data?.data;
  });
};
// 树权限（展开/折叠）
const handleCheckedTreeExpand = (value: any, type: any) => {
  if (type == "menu") {
    let treeList = state.menuOptions;
    for (let i = 0; i < treeList.length; i++) {
      const formWrap = unref(menuRef) as any;
      formWrap.store.nodesMap[treeList[i].menuId].expanded = value;
    }
  }
};
// 树权限（全选/全不选）
const handleCheckedTreeNodeAll = (value: any, type: any) => {
  if (type == "menu") {
    const formWrap = unref(menuRef) as any;
    formWrap.setCheckedNodes(value ? state.menuOptions : []);
  }
};
// 打开弹窗
const openDialog = (row: any) => {
  state.ruleForm = JSON.parse(JSON.stringify(row));
  !state.ruleForm.userId && getMenuTreeselect();
  state.isShowDialog = true;
  state.loading = false;
};
// 关闭弹窗
const closeDialog = (row?: object) => {
  proxy.mittBus.emit("onEditUserModule", row);
  state.isShowDialog = false;
};
// 取消
const onCancel = () => {
  closeDialog();
};

/** 提交按钮 */
const onSubmit = () => {
  const formWrap = unref(ruleFormRef) as any;
  if (!formWrap) return;
  formWrap.validate((valid: boolean) => {
    if (valid) {
      state.loading = true;
      if (state.ruleForm.id != undefined) {
        updateUser(state.ruleForm).then((response) => {
          ElMessage.success("修改成功");
          state.loading = false;
          closeDialog(); // 关闭弹窗
        });
      } else {
        addUser(state.ruleForm).then((response) => {
          ElMessage.success("新增成功");
          state.loading = false;
          closeDialog(); // 关闭弹窗
        });
      }
    }
  });
};

defineExpose({
  openDialog,
});
</script>
<style scoped lang="scss">
.updateUser {
  height: 100%;
  overflow: auto;
  padding-bottom: 53px;
  width: 600px;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 108px;
  height: 108px;
  margin: 8px;
  line-height: 108px;
  border-radius: 4px;
  text-align: center;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
}

.avatar {
  width: 108px;
  height: 108px;
  margin: 8px;
  border-radius: 4px;
  display: block;
}

.system-secret {
  width: 80%;
  display: flex;
  align-items: center;

  .el-button {
    margin-left: 20px;
  }
}</style>
