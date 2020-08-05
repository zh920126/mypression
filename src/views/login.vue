<template>
  <div class="login">
    <div class="container">
      <img
        src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1338595300,2119662265&fm=26&gp=0.jpg"
        alt
        class="avatar"
      />
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-rules">
        <el-form-item prop="username" >
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" >
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-key" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { debounce } from '../utils/public'
import { login } from '../apis/index'
import { initDynamicRouter } from '@/router/index'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 16,
            message: '请输入3-16位的密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit: debounce(function () {
      // 验证用户名密码是否合法
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const res = await login(this.loginForm)
          // console.log(res)
          if (res.data.code === '0000') {
            this.$message({
              type: 'success',
              message: '登录成功'
            })
            // 将token 用户信息  以及用户权限存起来
            this.$store.commit('getToken', res.data.data.userInfo.token)
            this.$store.commit('getUserInfo', res.data.data.userInfo)
            this.$store.commit('userRights', res.data.rights)
            this.$router.push({ name: 'Index' })
            // 根据用户权限动态渲染路由
            initDynamicRouter()
          } else {
            this.$message({
              type: 'warning',
              message: '登录失败，请重试'
            })
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请输入合法的用户名和密码'
          })
        }
      })
    }, 500)
  }
}
</script>

<style lang='less' scoped>
.login {
  position: relative;
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
      position: absolute;
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
  .demo-rules {
    margin-top: 80px;
  }
}
</style>
