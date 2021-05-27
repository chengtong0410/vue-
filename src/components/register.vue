<template>
  <div class="register-dialog">
    <el-dialog width="600px" :visible.sync="dialogState" @close="confirm">
      <template v-slot:title>
        <div class="title">用户注册</div>
      </template>
      <el-form :model="form" :rules="ruler">
        <el-form-item label="头像" label-width="70px" prop="photo">
          <el-upload
            class="avatar-uploader"
            action="http://autumnfish.cn/heimamm/public/uploads"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" label-width="70px" prop="phone">
          <el-input
            v-model="form.name"
            autocomplete="off"
          ></el-input> </el-form-item
        ><el-form-item label="手机" label-width="70px" prop="phone">
          <el-input
            v-model="form.phone"
            autocomplete="off"
          ></el-input> </el-form-item
        ><el-form-item label="邮箱" label-width="70px" prop="email">
          <el-input
            v-model="form.email"
            autocomplete="off"
          ></el-input> </el-form-item
        ><el-form-item label="密码" label-width="70px" prop="password">
          <el-input
            v-model="form.password"
            autocomplete="off"
          ></el-input> </el-form-item
        ><el-form-item label="验证码" label-width="70px" prop="code">
          <el-input
            v-model="form.code"
            autocomplete="off"
          ></el-input> </el-form-item
        ><el-form-item label="图形码" label-width="70px" prop="phoneCode">
          <el-input v-model="form.phoneCode" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirm">取 消</el-button>
        <el-button type="primary" @click="concel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPhoneCode, toRegister } from '../api/register';
export default {
  name: 'register',
  data() {
    return {
      form: {
        photo: '',
        name: '',
        password: '',
        phone: '',
        code: '',
        phoneCode: '',
        email: '',
      },
      ruler: {
        photo: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
        ],
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        phoneCode: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
        ],
        email: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
      },
      imageUrl: '',
    };
  },
  props: {
    dialogState: {
      type: Boolean,
    },
    title: {
      type: String,
    },
  },
  methods: {
    confirm() {
      console.log(111);
      this.$emit('dialogchange', false);
    },
    concel() {
      this.$emit('dialogchange', false);
      console.log(this.title);
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.title {
  background: linear-gradient(to right, #01c4fa, #1395fa);
  font-size: 14px;
  width: 600px;
  height: 53px;
  line-height: 53px;
  text-align: center;
}
/deep/ .el-dialog__header {
  padding: 0;
}
/deep/ .avatar-uploader {
  display: flex;
  justify-content: center;
}
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed rgb(160, 156, 156);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
