<template>
  <div>
    <el-container class="container">
      <el-main class="main">
        <el-row type="flex" justify="center" class="row">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="5">
            <el-card class="card" shadow="hover">
              <div slot="header">
                <span>注册</span>
                <router-link to="/login">
                  <el-link class="go-login" type="primary">去登陆</el-link>
                </router-link>
              </div>
              <el-input class="margin-bottom" placeholder="邮箱" v-model.trim="email" clearable autofocus="true" maxlength="80"></el-input>
              <el-input class="margin-bottom" placeholder="密码" v-model.trim="password" show-password maxlength="16"></el-input>
              <el-input class="margin-bottom" placeholder="确认密码" v-model.trim="againPassword" show-password maxlength="16" @keyup.enter.native="register"></el-input>
              <el-button type="primary" class="button" @click="register" :loading="loading">{{loading?'注册中':'注册'}}</el-button>
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
      againPassword: '',
      loading: false
    }
  },
  methods: {
    register() {
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
      if (this.password !== this.againPassword) {
        this.$message({
          showClose: true,
          message: '两次密码不一致',
          type: 'error'
        });
        return
      }
      let data = {
        email: this.email,
        password: this.password
      }
      this.loading = true
      this.$http.sso.post('/user', data).then( res => {
        // eslint-disable-next-line
        console.log('normal', res)
        if (res.status === 201) {
          this.$message({
            message: `账户（${res.data.email}）创建成功`,
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push('login')
          }, 3000);
        } else {
          this.$message({
            showClose: true,
            message: `账户创建失败（${res.status}）`,
            type: 'error'
          })
        }
        setTimeout(() => {
          this.loading = false
        }, 3000);
      }).catch( err => {
        setTimeout(() => {
          this.loading = false
        }, 3000);
        if (err && err.response && err.response.status === 409) {
          this.$message({
            message: '账户已存在',
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
    background-color: $color-account-main;
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
</style>