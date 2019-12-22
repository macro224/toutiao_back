<template>
  <div class="login">
    <div class="container">
        <img src="../assets/avatar.jpg" alt="" class="avatar">

      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            clearable
            prefix-icon="icon-user"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            clearable
            prefix-icon="icon-key"
          ></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { postUser } from '@/api/user.js'
export default {
  data () {
    return {
      loginForm: {
        username: '10086',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6-16位的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(async v => {
        if (v) {
          let res = await postUser(this.loginForm)
          // 判断是否登录成功
          if (res.data.message === '登录成功') {
            // 登录成功本地存储token值
            localStorage.setItem('toutiao_back', res.data.data.token)
            // 跳转页面
            this.$router.push({ name: 'index' })
          }
          // 提示框
          this.$message.success(res.data.message)
        // 二次验证
        } else {
          this.$message.error('输入的格式不对~')
          return false
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
