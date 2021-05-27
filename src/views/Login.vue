<template>
  <div class="login-warp">
    <div class="left">
      <div class="login-top">
        <img class="logo" src="../assets/img/login_logo.png" alt="" />
        <div class="title">黑马面面</div>
        <div class="center-item"></div>
        <div class="word">用户登录</div>
      </div>
      <el-form
        ref="loginForm"
        class="login-form"
        :rules="rules"
        :model="loginForm"
      >
        <el-form-item prop="phone">
          <el-input
            v-model="loginForm.phone"
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            show-password
            v-model="loginForm.password"
            placeholder="请输入密码"
          >
            <i slot="prefix" class="el-input__icon el-icon-lock"></i
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="16"
            ><el-form-item prop="tipWord">
              <el-input v-model="loginForm.tipWord" placeholder="请输入验证码">
                <i slot="prefix" class="el-input__icon el-icon-key"></i
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="8">
            <img
              class="login-code"
              :src="baseUrl + codeUrl"
              alt=""
              @click="refreshCode"
            />
          </el-col>
        </el-row>
      </el-form>
      <div class="user-konw">
        <el-checkbox v-model="userKnowState"
          >我已阅读并同意<span class="user-link">用户协议</span>和<span
            class="user-link"
            >隐私条款</span
          ></el-checkbox
        >
      </div>
      <div>
        <el-button type="primary" class="btn" @click="toLogin">登录</el-button>
      </div>
      <div class="btn2">
        <el-button type="primary" class="btn" @click="toRegister"
          >注册</el-button
        >
      </div>
    </div>
    <div class="right">
      <img src="../assets/img/login_img.png" alt="" />
    </div>

    <register
      ref="dialog"
      :dialogState="registerDialog"
      @dialogchange="onDialogChange"
    >
    </register>
  </div>
</template>

<script>
import { getLogin } from '../api/userLogin';
import register from '../components/register';
import { setLocal } from '../utils/local';
const validatePassPhone = (rule, value, callback) => {
  if (value.length > 12) {
    return callback(new Error('请输入正确的手机号码'));
  } else {
    callback();
  }
};
export default {
  data() {
    return {
      loginForm: {
        phone: '13144827260',
        password: '12345678',
        tipWord: '',
      },
      baseUrl: process.env.VUE_APP_URL,
      codeUrl: '/captcha?type=login',
      loginCodeUrl: 'http://autumnfish.cn/heimamm/public/captcha?type=login',
      userKnowState: false,
      rules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validatePassPhone, trigger: 'blur' },
          { min: 8, max: 11, message: '请输入正确的手机号码', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 11, message: '请输入正确的密码', trigger: 'blur' },
        ],
        tipWord: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入验证码', trigger: 'blur' },
        ],
      },
      registerDialog: false,
    };
  },
  methods: {
    toLogin() {
      console.log(11);
      this.$refs.loginForm.validate((val) => {
        if (!val) {
          return this.$message({
            showClose: true,
            message: '请填写正确的登录信息',
            type: 'error',
          });
        }
        getLogin({
          phone: this.loginForm.phone,
          password: this.loginForm.password,
          code: this.loginForm.tipWord,
          isPass: [true],
        }).then((res) => {
          const { data } = res.data;

          setLocal('token', data.token);
          this.$router.push('/home');
        });
      });
    },
    refreshCode() {
      this.codeUrl = '/captcha?type=login&sdgsdg=' + Date.now();
    },
    toRegister() {
      this.registerDialog = true;
    },
    onDialogChange(val) {
      this.registerDialog = val;
    },
  },
  components: {
    register,
  },
};
</script>

<style lang="less">
.login-warp {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(#1493fa 28%, #01c6fa 96%);
  .left {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding: 42px;
    .login-top {
      display: flex;
      align-items: center;
      height: 31px;
      margin-bottom: 30px;
      .title {
        padding: 0 14px;
        font-size: 24px;
        border-right: 1px solid #0c0c0c;
      }
      .center-item {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
        margin-right: 12px;
      }
      .word {
        font-size: 22px;
      }
    }
    .login-code {
      margin-left: 5px;
      width: 120px;
      height: 40px;
      // object-fit: cover;
    }
    .user-link {
      color: #409eff;
    }
    .user-link:hover {
      text-decoration: underline;
    }
    .btn {
      width: 100%;
      margin-top: 25px;
    }
    .btn2 {
      margin-top: 10px;
    }
  }
}
</style>
