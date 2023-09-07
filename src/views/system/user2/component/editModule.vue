<template>
  <div class="system-menu-container">
    <el-dialog v-model="state.isShowDialog" width="769px" center>
      <template #header>
        <div style="font-size: large"
          v-drag="['.system-menu-container .el-dialog', '.system-menu-container .el-dialog__header']">{{ title }}</div>
      </template>
      <el-form ref="ruleFormRef" :model="state.ruleForm" :rules="state.ruleRules" label-width="120px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="state.ruleForm.username" placeholder="请输入敏感词" />
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="state.ruleForm.password" placeholder="请输入用户密码" type="password" />
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="state.ruleForm.username" placeholder="请输入用户名称" />
        </el-form-item>
        <!-- <el-form-item label="角色">
          <el-select v-model="state.roleIds" multiple placeholder="请选择">
            <el-option v-for="item in state.roleOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId"
              :disabled="item.status == 0"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="状态">
          <el-radio-group v-model="state.ruleForm.status">
            <el-radio v-for="dict in sys_enable_disable" :key="dict.dictValue" :label="dict.dictValue">{{
              dict.dictLabel }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="谷歌秘钥" prop="secret">
          <div class="system-secret">
            <el-input v-model="state.ruleForm.secret" disabled />
            <el-button type="primary" @click="getUserSecret">刷新</el-button>
          </div>
        </el-form-item>
        <el-form-item label="谷歌秘钥二维码">
          <twoDimensionalCode :ruleForm="state.ruleForm" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel">取 消</el-button>
          <el-button type="primary" @click="onSubmit" :loading="state.loading">确 定</el-button>
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
  loading: false,
  ruleForm: {
    userId: undefined, // 用戶ID
    username: "", // 用戶名称
    nickName: "", // 用戶昵称
    deptId: "", // 部门ID
    roleId: "", // 角色ID
    status: "", //用户状态
    password: "", // 用户密码
    secret: "", // 二维码秘钥
    qrcode: "",//二维码地址
  },
  // 表单校验
  ruleRules: {
    word: [
      { required: true, message: "敏感词不能为空", trigger: "blur" },
    ],
  },
});
// 打开弹窗
const openDialog = (row: any) => {
  state.ruleForm = JSON.parse(JSON.stringify(row));
  !state.ruleForm.userId && getUserSecret()
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
// 获取一个谷歌二维码
const getUserSecret = () => {
  userSecret().then((res) => {
    if (res.code !== 200) return;
    let { secret, qrcode } = res.data
    state.ruleForm.secret = secret
    state.ruleForm.qrcode = qrcode
  })
}
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
}
</style>
