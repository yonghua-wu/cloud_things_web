<template>
  <div>
    <el-container class="container">
      <el-main class="main">
        <el-row type="flex" justify="center" class="row">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="5">
            <el-card class="card" shadow="hover">
              <div slot="header">
                <span>找回密码</span>
                <router-link to="/login">
                  <el-link class="go-login" type="primary">去登陆</el-link>
                </router-link>
              </div>
              <el-input class="margin-bottom" placeholder="邮箱" v-model.trim="email" clearable autofocus="true" maxlength="80"></el-input>
              <el-input class="margin-bottom" placeholder="验证码" v-model.trim="pin" maxlength="6">
                <el-button class="get-pin" slot="append" type="primary" @click="getPin">{{countdownNum===0?'获取验证码':countdownNum}}</el-button>
              </el-input>
              <el-input class="margin-bottom" placeholder="密码" v-model.trim="password" show-password maxlength="16"></el-input>
              <el-input class="margin-bottom" placeholder="确认密码" v-model.trim="againPassword" show-password maxlength="16"></el-input>
              <el-button type="primary" class="button" @click="resetPw">找回密码</el-button>
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
      pin: '',
      password: '',
      againPassword: '',
      countdownNum: 0
    }
  },
  methods: {
    getPin() {
      if (!this.email) {
        this.$message({
          message: '请输入邮箱',
          type: 'error'
        });
        return
      }
      if (!(/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/).test(this.email)) {
        this.$message({
          message: '邮箱不合法',
          type: 'error'
        });
        return
      }
      if (this.countdownNum === 0) {
        let that = this
        that.countdownNum = 120
        setTimeout(function countdown() {
          if (that.countdownNum !== 0) {
            that.countdownNum--
            setTimeout(countdown, 1000)
          }
        }, 1000)
      } else {
        this.$message({
          message: `请稍后重试（${this.countdownNum}s）`,
          type: 'error'
        });
        return
      }
    },
    resetPw() {
      if (!this.email) {
        this.$message({
          message: '请输入邮箱',
          type: 'error'
        });
        return
      }
      if (!(/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/).test(this.email)) {
        this.$message({
          message: '邮箱不合法',
          type: 'error'
        });
        return
      }
      if (!this.pin) {
        this.$message({
          message: '请输入验证码',
          type: 'error'
        });
        return
      }
      if (!this.password) {
        this.$message({
          message: '请输入密码',
          type: 'error'
        });
        return
      }
      if (this.password !== this.againPassword) {
        this.$message({
          message: '两次密码不一致',
          type: 'error'
        });
        return
      }
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
    background-color: $color-main;
    .row {
      height: 100%;
      align-items: center;
    }
  }
}
.margin-bottom {
  margin-bottom: 15px;
}
.button {
  width: 100%;
}
.go-login {
  float: right;
}
.get-pin {
  width: 110px;
}
</style>