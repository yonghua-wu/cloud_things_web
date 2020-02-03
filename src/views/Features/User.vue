<template>
  <div class="user" @click="cancal">
    <div class="features-title">账户信息</div>
    <div class="container">
      <el-row type="flex" justify="center" class="item">
        <el-col :xs="8" :sm="8" :md="3" class="key">ID</el-col>
        <el-col :xs="16" :sm="16" :md="8" class="value">{{userInfo.id}}</el-col>
      </el-row>
      <el-row type="flex" justify="center" class="item">
        <el-col :xs="8" :sm="8" :md="3" class="key">Email</el-col>
        <el-col :xs="16" :sm="16" :md="8" class="value">{{userInfo.email}}</el-col>
      </el-row>
      <el-row type="flex" justify="center" class="item">
        <el-col :xs="8" :sm="8" :md="3" class="key">昵称</el-col>
        <el-col :xs="16" :sm="16" :md="8" class="value" :class="userInfo.nickname?'':'unset'">
          <span title="点击修改" v-if="!isSetNickname" @click.stop="showInput('nickname')">{{userInfo.nickname || '未设置'}}</span>
          <el-input v-else placeholder="请输入昵称" v-model="newNickname" maxlength="20" @keyup.enter.native="changeNickname">
            <el-button slot="append" icon="el-icon-check" @click.stop="changeNickname"></el-button>
            <el-button slot="append" icon="el-icon-close" @click.stop="isSetNickname=false"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" class="item">
        <el-col :xs="8" :sm="8" :md="3" class="key">手机号</el-col>
        <el-col :xs="16" :sm="16" :md="8" class="value" :class="userInfo.nickname?'':'unset'">
          <span title="点击修改" v-if="!isSetTel" @click.stop="showInput('tel')">{{userInfo.tel || '未设置'}}</span>
          <el-input v-else placeholder="请输入手机号" v-model="newTel" maxlength="11" @keyup.enter.native="changeTel">
            <el-button slot="append" icon="el-icon-check" @click.stop="changeTel"></el-button>
            <el-button slot="append" icon="el-icon-close" @click.stop="isSetTel=false"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" class="item">
        <el-col :xs="8" :sm="8" :md="3" class="key">注册时间</el-col>
        <el-col :xs="16" :sm="16" :md="8" class="value">{{userInfo.create_at}}</el-col>
      </el-row>
      <el-row type="flex" justify="center" class="item">
        <el-col :xs="8" :sm="8" :md="3" class="key">登陆时间</el-col>
        <el-col :xs="16" :sm="16" :md="8" class="value">{{userInfo.last_login_time}}</el-col>
      </el-row>
      <el-row type="flex" justify="center" class="item">
        <el-button plain @click="loginOut">退出登陆</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      networkErr: false,
      isSetNickname: false,
      newNickname: '',
      isSetTel: false,
      newTel: ''
    }
  },
  mounted() {
    this.userInfo = this.$store.state.userInfo
    if (! ('id' in this.userInfo)) {
      this.loadUserInfo()
    }
  },
  methods: {
    loading(text) {
      return this.$loading({
        target: document.getElementById('main'),
        lock: true,
        text: text,
        spinner: 'el-icon-loading'
      });
    },
    loadUserInfo() {
      const loading = this.loading('加载中')
      this.$http.sso.get('/user').then( res => {
        // eslint-disable-next-line no-console
        console.log(res.data)
        this.userInfo = res.data
        this.$store.commit('setUserInfo', res.data)
        loading.close();
      })
    },
    loginOut() {
      this.$store.commit('resetAuth')
      this.$store.commit('resetUserInfo')
      this.$message({
        message: `已退出登陆`,
        type: 'success'
      })
      setTimeout(() => {
        this.$router.push('/login')
      }, 1000);
    },
    showInput(from) {
      switch(from) {
        case 'nickname':
          this.isSetNickname = true
          this.newNickname = this.userInfo.nickname || ''
          this.isSetTel = false
          break
        case 'tel':
          this.isSetTel = true
          this.newTel = this.userInfo.tel || ''
          this.isSetNickname = false
          break
      }
    },
    cancal(e) {
      if (e.target.localName !== 'input') {
        this.isSetNickname = false
        this.isSetTel = false
      }
    },
    changeNickname() {
      const loading = this.loading('修改中')
      this.$http.sso.patch('/user', {
        id: this.userInfo.id,
        nickname: this.newNickname
      }).then( res => {
        // eslint-disable-next-line no-console
        console.log(res.data)
        this.userInfo.nickname = res.data.nickname
        this.isSetNickname = false
        loading.close()
      }).catch( () => {
        this.isSetNickname = false
        loading.close()
      })
    },
    changeTel() {
      const loading = this.loading('修改中')
      this.$http.sso.patch('/user', {
        id: this.userInfo.id,
        tel: this.newTel
      }).then( res => {
        // eslint-disable-next-line no-console
        console.log(res.data)
        this.userInfo.tel = res.data.tel
        this.isSetTel = false
        loading.close()
      }).catch( () => {
        this.isSetTel = false
        loading.close()
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../globel';
.features-title {
  @include features-title;
}
.container {
  max-width: 1000px;
  .item {
    height: 70px;
    align-items: center;
    .key {
      text-align: right;
      color: #4c4c4c;
    }
    .value {
      text-align: center;
    }
    .unset {
      color: #555;
    }
  }
}
</style>
<style lang="scss">
.container {
  .item {
    .value {
      .el-input {
        max-width: 260px;
        .el-button {
          padding: 10px 12px;
          .el-icon-check {
            font-size: 18px;
            &:hover {
              color: #000;
            }
          }
          .el-icon-close {
            font-size: 18px;
            &:hover {
              color: #ee4444;
            }
          }
        }
      }
    }
  }
}
</style>