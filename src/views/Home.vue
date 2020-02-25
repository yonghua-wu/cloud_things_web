<template>
  <div class="home">
    <el-header class="header">
      <router-link to="/">
        <h2>云物</h2>
      </router-link>
      <el-dropdown :show-timeout="300" @command="handleCommand">
        <router-link to="/user"><span class="el-dropdown-link">{{email}}<i class="el-icon-arrow-down el-icon--right"></i></span></router-link>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="login_out">退出登陆</el-dropdown-item>
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
      <el-main class="main" id="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  data () {
    return {
      mountedActive: '',
      email: ''
    }
  },
  mounted () {
    this.mountedActive = this.$route.path
    // eslint-disable-next-line
    console.log(this.$store.state.auth);
    this.email = this.$store.state.userInfo.email
  },
  watch: {
    '$route': function () {
      this.mountedActive = this.$route.path
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      // eslint-disable-next-line
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      // eslint-disable-next-line
      console.log(key, keyPath);
    },
    handleCommand (command) {
      switch (command) {
        case 'login_out':
          this.$store.commit('resetAuth')
          this.$store.commit('resetUserInfo')
          this.$message({
            message: `已退出登陆`,
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss">
@import '../globel';
.home {
  height: 100vh;
  width: 100vw;
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
