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
        <i :class="icons" class="tabs" @click="handle"></i>
        <div class="title">商城后台管理系统</div>
        <div class="user">
          <el-dropdown @command="handleClick">
            <span class="el-dropdown-link">
              {{$store.state.userinfo.username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personalCenter">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <!-- <el-aside >
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
          <el-menu
            :router="true"
            :collapse="isCollapse"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu :index="String(value.id)" v-for="(value,index) in meauItems" :key="index">
              <template slot="title">
                <i :class="value.icon"></i>
                <span>{{value.authName}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="v2 in value.children"
                  :key="v2.authName"
                  :index="v2.path"
                >{{v2.authName}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>-->
        <el-menu
            :router="true"
            :collapse="isCollapse"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            :default-active="active"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu :index="String(value.id)" v-for="(value,index) in meauItems" :key="index">
              <template slot="title">
                <i :class="value.icon"></i>
                <span>{{value.authName}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="v2 in value.children"
                  :key="v2.authName"
                  :index="v2.path"
                >{{v2.authName}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        <el-main>
          <Tabbar @removeRoute="handleRemoveRoute"></Tabbar>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Tabbar from '@/components/tabbar'
export default {
  data () {
    return {
      meauItems: [],
      isCollapse: false,
      icons: 'el-icon-s-fold',
      tabs: []
    }
  },
  components: {
    Tabbar
  },
  computed: {
    // 显示当前的路由
    active () {
      return this.$route.name.toLowerCase()
    },
    // 当前打开的页面
    ...mapState(['userRights', 'userTabs'])
  },
  created () {
    // console.log(this.userRights)
    this.meauItems = this.userRights
  },
  methods: {
    handleRemoveRoute (v) {
      console.log(v)
      console.log(this.active)
      if (v.path === this.active) {
        this.$router.push('/index')
      }
    },
    // 侧边栏缩放
    handle () {
      this.isCollapse = !this.isCollapse
      if (!this.isCollapse) {
        this.icons = 'el-icon-s-fold'
      } else {
        this.icons = 'el-icon-s-unfold'
      }
    },
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

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.tabs{
  font-size: 30px;
}
.index {
  height: 100%;
}
.el-main {
  padding: 0;
  line-height: 1.2!important;
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
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100% !important;
  .el-menu {
    // width: 200px;
  }
  /deep/.el-menu-item-group__title {
    padding: 0 !important;
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
