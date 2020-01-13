<template>
  <div>
    <el-container class="container">
      <el-main class="main">
        <el-row type="flex" justify="center" class="row">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="5">
            <el-card class="card" shadow="hover">
              <div slot="header">
                <span>登陆</span>
                <router-link to="/register">
                  <el-link class="go-register" type="primary">去注册</el-link>
                </router-link>
              </div>
              <el-input class="margin-bottom" placeholder="邮箱" v-model.trim="email" clearable autofocus="true" maxlength="80"></el-input>
              <el-input placeholder="密码" v-model.trim="password" show-password maxlength="16"></el-input>
              <div class="forget-pw">
                <el-link class="margin-bottom" type="primary" @click="$router.push('/forget_pw')">忘记密码</el-link>
              </div>
              <el-button type="primary" class="button" :loading="loading" @click="login">登陆</el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false
    }
  },
  methods: {
    login() {
      if (!this.email) {
        this.$message({
          showClose: true,
          message: '请输入邮箱',
          type: 'error'
        });
        return
      }
      if (!(/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/).test(this.email)) {
        this.$message({
          showClose: true,
          message: '邮箱不合法',
          type: 'error'
        });
        return
      }
      if (!this.password) {
        this.$message({
          showClose: true,
          message: '请输入密码',
          type: 'error'
        });
        return
      }
      // let data = {
      //   email: this.email,
      //   password: this.password
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../globel";
.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .main {
    position: relative;
    background-color: $color-account-main;
    .row {
      height: 100%;
      align-items: center;
    }
  }
}
.margin-bottom {
  margin-top: 4px;
  margin-bottom: 28px;
}
.button {
  width: 100%;
}
.forget-pw {
  padding-top: 5px;
  text-align: right;
}
.go-register {
  float: right;
}
</style>