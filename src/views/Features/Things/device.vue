<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="beforeLeave">
      <el-tab-pane name="back">
        <span slot="label" class="back"><i class="el-icon-back"></i> 返回</span>
      </el-tab-pane>
      <el-tab-pane label="状态" name="state">
        <state :device="device" :model="model" />
      </el-tab-pane>
      <el-tab-pane label="信息" name="info">
        <info :device="device" :model="model" @reset-key="resetKey" />
      </el-tab-pane>
      <el-tab-pane label="操作" name="operation">
        <operation :device="device" :model="model" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import state from '@/components/Device/State'
import info from '@/components/Device/Info'
import operation from '@/components/Device/Operation'

export default {
  components: {
    state,
    info,
    operation
  },
  data () {
    return {
      activeName: 'state',
      id: null,
      device: {},
      model: {}
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.loadData()
  },
  methods: {
    loadData () {
      this.$http.ct.get('/devices/' + this.id).then(res => {
        this.device = res.data
        this.$http.ct.get('/models/' + this.device.modelId).then(res => {
          this.model = res.data
        })
      })
    },
    handleClick (tab, event) {
      // eslint-disable-next-line
      // console.log(tab, event)
    },
    beforeLeave (activeName) {
      if (activeName === 'back') {
        this.$router.go(-1)
        return false
      } else {
        return true
      }
    },
    resetKey () {
      this.$http.ct.patch(`/devices/${this.device.id}/key`).then(res => {
        this.device.key = res.data.key
        this.$message({
          message: '获取成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/globel';
.back {
  font-size: 16px;
  border-right: 2px solid #DCDFE6;
  padding-right: 30px;
}
</style>
