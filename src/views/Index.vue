<template>
  <div class="index">
    <el-container>
      <!-- 左边栏 -->
      <el-aside width="200px">
        <img src="@/assets/logo.png" alt />
        <el-menu
          :router='true'
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 文章管理 -->
          <el-submenu index="1">
            <span slot="title">
              <i class="el-icon-location"></i>
              <span>文章管理</span>
            </span>
            <el-menu-item index="xinwenList">
              <i class="el-icon-location"></i>文章列表
            </el-menu-item>
            <el-menu-item index="xinwenFabu">
              <i class="el-icon-location"></i>文章发布
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右边栏 -->
      <el-container>
        <!-- 右边栏头部 -->
        <el-header>
          <span class="icon-paragraph-justify toggle-btn"></span>
          <span class="system-title">黑马头条后台管理系统</span>
          <div class="welcome">
            <span>欢迎你：40期的小伙伴</span> &nbsp;&nbsp;&nbsp;
            <span @click="tuichu">退出</span>
          </div>
        </el-header>

        <!-- 右边栏主体部 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>

  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    tuichu () {
      localStorage.removeItem('toutiao_back')
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  border-right: 0;
}
.index {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    color: #fff;
    background-color: #545c64;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: #fff;
  }

}
</style>
