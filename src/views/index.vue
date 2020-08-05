<template>
  <div class="index">
    <el-container>
      <el-header>
        <div class="logo">
          <el-image
            src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=397385748,3693940230&fm=26&gp=0.jpg"
            lazy
          ></el-image>
        </div>
        <div class="title">商城后台管理系统</div>
        <div class="user">
          <el-dropdown  @command="handleClick">
            <span class="el-dropdown-link">
              {{$store.state.userinfo.username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command='personalCenter'>个人中心</el-dropdown-item>
              <el-dropdown-item command='logout'>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu  :router='true'
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
            <el-submenu :index="String(value.id)" v-for="(value,index) in meauItems" :key="index">
              <template slot="title">
                <i :class="value.icon"></i>{{value.authName}}
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="v2 in value.children"  :key="v2.authName" :index="v2.path" >{{v2.authName}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      meauItems: []
    }
  },
  computed: {
    ...mapState(['userRights'])
  },
  created () {
    // console.log(this.userRights)
    this.meauItems = this.userRights
  },
  methods: {
    // 退出登录
    handleClick (command) {
      if (command === 'logout') {
        // 删除token与用户信息
        sessionStorage.clear()
        // 返回登录页面
        this.$router.push('/login')
        // 刷新页面进行清除vuex的数据
        window.location.reload()
      } else {
        this.$message({
          type: 'error',
          message: '暂无个人中心页面'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  height: 100%;
}
/deep/.el-header {
  background-color: #b3c0d1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px !important;
  padding: 0;
  .logo {
    height: 100%;
    .el-image {
      width: 200px;
      height: 100%;
    }
  }
  .title {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    font-weight: 600;
    color: #fff;
  }
  .user {
    margin-right: 50px;
  }
}

.el-aside {
  background-color:#545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100% !important;
  .el-menu {
    width: 200px;
  }
  /deep/.el-menu-item-group__title {
      padding: 0!important;
    }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-container {
  height: 100%;
}
</style>
