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
              <el-input placeholder="密码" v-model.trim="password" show-password maxlength="16" @keyup.enter.native="login"></el-input>
              <div class="forget-pw">
                <el-link class="margin-bottom" type="primary" @click="$router.push('/forget_pw')">忘记密码</el-link>
              </div>
              <el-button type="primary" class="button" :loading="loading" @click="login">{{loading ? '登陆中' : '登陆'}}</el-button>
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
      if (!this.password) {
        this.$message({
          message: '请输入密码',
          type: 'error'
        });
        return
      }
      let data = {
        email: this.email,
        password: this.password
      }
      this.loading = true
      this.$http.sso.post('/auth', data).then( res => {
        // eslint-disable-next-line
        console.log('normal', res)
        if (res.status === 200) {
          this.$message({
            message: `登陆成功`,
            type: 'success'
          });
          setTimeout(() => {
            // this.$router.push('login')
          }, 3000);
        } else {
          this.$message({
            message: `登陆失败（${res.status}）`,
            type: 'error'
          });
        }
        setTimeout(() => {
          this.loading = false
        }, 3000);
      }).catch( err => {
        setTimeout(() => {
          this.loading = false
        }, 3000);
        if (err && err.response && err.response.status === 401) {
          this.$message({
            message: '账号或密码错误',
            type: 'error'
          });
          return
        } else {
          this.$message({
            message: '网络异常',
            type: 'error'
          });
          return
        }
      })
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