<template>
  <div class="things">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span class="card-title">模型</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="goModelPage('add')">
          <i class="el-icon-plus"></i> 添加模型
        </el-button>
        <el-button style="float: right; padding: 3px 15px 3px 0px" type="text" @click="loadData">
          <i class="el-icon-refresh"></i> 刷新
        </el-button>
      </div>
      <div slot="body">123</div>
      <el-table
        :data="modelList"
        style="width: 100%;"
        height="100%">
        <el-table-column
          prop="id"
          label="ID"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          width="170"
          align="center"
          sortable
          :formatter="timeFormat">
        </el-table-column>
        <el-table-column
          prop="updatedAt"
          label="修改时间"
          align="center"
          width="170"
          :formatter="timeFormat"
          sortable>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="170">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              @click="goModelPage(scope.row.id)">详情</el-button>
            <el-button
              size="mini"
              type="danger"
              plain
              @click="modelDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
        <template slot="append">
          <div v-if="modelList.length > 0" class="append">加载完成</div>
        </template>
      </el-table>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span class="card-title">设备</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="goDevicePage('add')">
          <i class="el-icon-plus"></i> 添加设备
        </el-button>
        <el-button style="float: right; padding: 3px 15px 3px 0px" type="text" @click="loadData">
          <i class="el-icon-refresh"></i> 刷新
        </el-button>
      </div>
      <el-table
        :data="deviceList"
        style="width: 100%;"
        height="100%">
        <el-table-column
          prop="id"
          label="ID"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          label="状态"
          width="80"
          align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.connected" class="online">
              <div class="point"></div>
              <div>在线</div>
            </div>
            <div v-else class="offline">
              <div class="point"></div>
              <div>离线</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          width="170"
          align="center"
          :formatter="timeFormat"
          sortable>
        </el-table-column>
        <el-table-column
          prop="updatedAt"
          label="修改时间"
          width="170"
          align="center"
          :formatter="timeFormat"
          sortable>
        </el-table-column>
        <el-table-column
          label="操作"
          width="170"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              @click="goDevicePage(scope.row.id)">详情</el-button>
            <el-button
              size="mini"
              type="danger"
              plain
              @click="modelDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
        <template slot="append">
          <div v-if="deviceList.length > 0" class="append">加载完成</div>
        </template>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      modelList: [],
      deviceList: []
    }
  },
  mounted () {
    this.loadData()
  },
  computed: {
  },
  methods: {
    loadData () {
      const loading = this.$loadingMain('加载中')
      const loadModels = this.$http.ct.get('/models')
      const loadDevices = this.$http.ct.get('/devices')
      Promise.all([loadModels, loadDevices]).then(res => {
        this.modelList = (res[0].data && res[0].data.list) || []
        this.deviceList = (res[1].data && res[1].data.list) || []
        loading.close()
      })
    },
    modelEdit (id) {
      // eslint-disable-next-line
      console.log('edit:', id)
    },
    modelDelete (id) {
      // eslint-disable-next-line
      console.log('delete:', id)
      this.$http.ct.del('/models/' + id).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    },
    deviceEdit (id) {
      // eslint-disable-next-line
      console.log('edit:', id)
    },
    deviceDelete (id) {
      // eslint-disable-next-line
      console.log('delete:', id)
      this.$http.ct.del('/devices/' + id).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    },
    goModelPage (param) {
      this.$router.push('/things/model/' + param)
    },
    goDevicePage (param) {
      this.$router.push('/things/device/' + param)
    },
    timeFormat (...params) {
      return moment(new Date(params[2])).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="scss">
@import '@/globel';
.things {
  height: 100%;
}
.box-card {
  margin-bottom: 20px;
  height: calc(50% - 10px);
  &:last-child {
    margin-bottom: 0px;
  }
  .card-title {
    font-weight: bold;
  }
  .el-card__body {
    height: calc(100% - 95px);
  }
  .online, .offline {
    @include flex-row;
    align-items: center;
    justify-content: center;
    .point {
      height: 8px;
      width: 8px;
      margin-right: 5px;
      border-radius: 3px;
      background-color: $color-main;
    }
  }
  .offline {
    color: #F56C6C;
    .point {
      background-color: #F56C6C;
    }
  }
  .append {
    width: 100%;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
    color: $color-main + 80;
  }
}
</style>
