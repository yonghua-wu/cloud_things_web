<template>
  <div class="home">
    <el-header class="header">
      <router-link to="/">
        <h2>云物</h2>
      </router-link>
      
        <el-dropdown :show-timeout="800">
          <router-link to="/user"><span class="el-dropdown-link">39293@qq.com</span></router-link>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      
    </el-header>
    <el-container class="container">
      <el-aside class="aside">
        <el-menu
          :default-active="mountedActive"
          class="menu"
          :router="true"
          @open="handleOpen"
          @close="handleClose"
          background-color="#3e3e3e"
          text-color="#aaa"
          active-text-color="#fff">
          <el-menu-item index="/">
              <i class="el-icon-odometer"></i>
              <span>总览</span>
          </el-menu-item>
          <el-menu-item index="/things">
            <i class="el-icon-cpu"></i>
            <span slot="title">设备</span>
          </el-menu-item>
          <el-menu-item index="/document">
            <i class="el-icon-document"></i>
            <span slot="title">文档</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <i class="el-icon-user"></i>
            <span slot="title">账户</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  data() {
    return {
      mountedActive: ''
    }
  },
  mounted() {
    this.mountedActive = this.$route.path
  },
  watch: {
    '$route': function() {
      this.mountedActive = this.$route.path
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // eslint-disable-next-line
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // eslint-disable-next-line
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss">
@import '../globel';
// body {
//   height: 100vh;
//   width: 100vw;
// }
.home {
  height: 100vh;
  width: 100vw;
  // background-color: $color-main;
  // position: absolute;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
}
.header {
  background-color: $color-main;
  color: $color-text-main;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  h2 {
    margin: 0;
    font-weight: 200;
    color: $color-text-main;
    transition: color .3s;
    &:hover {
      color: $color-text-main + 30;
    }
  }
  span {
    color: $color-text-main - 30;
    font-size: 14px;
    transition: color .3s;
    &:hover {
      color: $color-text-main + 30;
    }
  }
}
.container {
  height: calc(100% - 60px);
}
.aside {
  height: 100%;
  background-color: $color-main;
  .menu {
    border-right: 0;
  }
}
.main {
  background-color: #fff;
  overflow: auto;
}
</style>
