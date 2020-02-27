<template>
  <div>
    <nav-header title="添加设备" />
    <el-form :model="deviceForm" :rules="check" ref="deviceForm">
      <el-form-item label-width="100px" label="名称" prop="name">
        <el-input
          class="input"
          placeholder="设备名称，3-20字符"
          maxlength="20"
          minlength="3"
          show-word-limit
          v-model.trim="deviceForm.name"
        ></el-input>
      </el-form-item>

      <el-form-item label="描述" label-width="100px">
        <el-input
          class="input"
          type="textarea"
          :rows="3"
          maxlength="200"
          show-word-limit
          placeholder="设备描述"
          v-model.trim="deviceForm.description">
        </el-input>
      </el-form-item>

      <el-form-item label="模型" label-width="100px" :rules="{ required: true, message: '请选择模型', trigger: 'change' }">
        <el-select v-model="deviceForm.modelId" placeholder="请选择模型">
          <el-option
            v-for="item in models"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="设备描述" label-width="100px">
        <el-table
          :data="deviceForm.details"
          class="table">
          <el-table-column
            prop="name"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="value"
            label="值">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-popconfirm
                confirmButtonText='删除'
                cancelButtonText='不用了'
                icon="el-icon-info"
                iconColor="red"
                title="确定删除？"
                @onConfirm="delDetail(scope.$index)">
                <el-button slot="reference" size="mini" type="danger" plain=""><span>删除...</span></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
          <template slot="empty">
            <el-link :underline="false" @click="showDialogAddDetail"><i class="el-icon-plus"></i> 添加...</el-link>
          </template>
          <template slot="append" v-if="deviceForm.details.length > 0">
            <div class="append">
              <el-link :underline="false" @click="showDialogAddDetail"><i class="el-icon-plus"></i> 添加...</el-link>
            </div>
          </template>
        </el-table>
      </el-form-item>

      <el-form-item label="通知规则" label-width="100px">
        <el-table
          :data="deviceForm.rules"
          class="table">
          <el-table-column
            prop="name"
            label="作用到">
          </el-table-column>
          <el-table-column
            prop="condition"
            label="条件">
          </el-table-column>
          <el-table-column
            prop="value"
            label="阈值">
          </el-table-column>
          <el-table-column
            prop="notice_leven"
            label="通知等级">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-popconfirm
                confirmButtonText='删除'
                cancelButtonText='不用了'
                icon="el-icon-info"
                iconColor="red"
                title="确定删除？"
                @onConfirm="delRule(scope.$index)">
                <el-button slot="reference" size="mini" type="danger" plain=""><span>删除...</span></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
          <template slot="empty">
            <el-link :underline="false" @click="showDialogAddRule"><i class="el-icon-plus"></i> 添加...</el-link>
          </template>
          <template slot="append" v-if="deviceForm.rules.length > 0">
            <div class="append">
              <el-link :underline="false" @click="showDialogAddRule"><i class="el-icon-plus"></i> 添加...</el-link>
            </div>
          </template>
        </el-table>
      </el-form-item>
      <el-form-item label-width="100px">
        <el-button class="button" type="primary" @click="onSubmit('deviceForm')" :loading="submitting">提交{{submitting?'中':''}}</el-button>
        <el-button class="button" @click="onCancal" :disabled="submitting">取消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="添加描述" :visible.sync="dialogAddDetail" width="500px">
      <el-form :model="detailForm" :rules="check" ref="detailForm">
        <el-form-item label="名称" label-width="100px">
          <el-input v-model.trim="detailForm.name" autocomplete="off" placeholder="名称" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="值" label-width="100px">
          <el-input v-model.trim="detailForm.value" autocomplete="off" placeholder="值" maxlength="30" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddDetail = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('detailForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加通知规则" :visible.sync="dialogAddRule" width="500px">
      <el-form :model="ruleForm" :rules="check" ref="ruleForm">
        <el-form-item label="字段" label-width="100px" required>
          <el-select v-model="ruleForm.name" placeholder="请选择">
            <el-option
              v-for="(item, index) in modelsDetail.attributes"
              :key="index"
              :label="item.view_name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="条件" label-width="100px" required>
          <el-select v-model="ruleForm.condition" placeholder="请选择">
            <el-option label="大于" value="$gt"></el-option>
            <el-option label="大于等于" value="$gte"></el-option>
            <el-option label="等于" value="$eq"></el-option>
            <el-option label="不等于" value="$ne"></el-option>
            <el-option label="小于等于" value="$lte"></el-option>
            <el-option label="小于" value="$lt"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阈值" label-width="100px" prop="value">
          <el-input v-model="ruleForm.value" autocomplete="off" placeholder="请输入" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="通知等级" label-width="100px" required>
          <el-select v-model="ruleForm.notice_leven" placeholder="请选择">
            <el-option label="通知" :value="0"></el-option>
            <el-option label="警告" :value="1"></el-option>
            <el-option label="错误" :value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddRule = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import navHeader from '../../../components/NavHeader'
// import moment from 'moment'

export default {
  name: 'addDevice',
  components: {
    'nav-header': navHeader
  },
  data () {
    return {
      deviceForm: {
        name: '',
        description: '',
        modelId: null,
        details: [],
        rules: [],
        createdAt: '',
        updatedAt: ''
      },
      detailForm: {
        name: '',
        value: ''
      },
      ruleForm: {
        name: '',
        condition: '',
        value: '',
        notice_leven: 0
      },
      check: {
        name: [
          { required: true, message: '请输入属性名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_]{3,12}$/, message: '长度在3到30个(a-z,A-Z,0-9)', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        selectModel: [
          { required: true, message: '请选择模型', trigger: 'change' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      models: [],
      modelsDetail: {
        id: null
      },
      dialogAddDetail: false,
      dialogAddRule: false,
      isEdit: true,
      isAdd: false,
      submitting: false,
      temp: {
        name: '',
        description: '',
        mm: null,
        details: [],
        rules: [],
        createdAt: '',
        updatedAt: ''
      }
    }
  },
  mounted () {
    this.loadModels()
  },
  methods: {
    loadModels () {
      this.$http.ct.get('/models').then(res => {
        this.models = res.data.list
        this.deviceForm.modelId = this.models[0].id
      })
    },
    loadModelDetail (id) {
      this.$http.ct.get('/models/' + id).then(res => {
        this.modelsDetail = res.data
      })
    },
    showDialogAddDetail () {
      this.dialogAddDetail = true
      this.detailForm = {
        name: '',
        value: ''
      }
    },
    showDialogAddRule () {
      this.dialogAddRule = true
      if (this.modelsDetail.id !== this.deviceForm.modelId) {
        this.$http.ct.get('/models/' + this.deviceForm.modelId).then(res => {
          this.modelsDetail = res.data
          this.ruleForm.name = this.modelsDetail.attributes[0].name
        })
      }
      this.ruleForm = {
        name: this.modelsDetail.attributes && this.modelsDetail.attributes[0].name,
        condition: '$eq',
        value: '',
        notice_leven: 0
      }
    },
    delDetail (index) {
      this.deviceForm.details.splice(index, 1)
    },
    delRule (index) {
      this.deviceForm.rules.splice(index, 1)
    },
    onCancal () {
      this.$router.go(-1)
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          switch (formName) {
            case 'deviceForm':
              this.submitting = true
              this.$http.ct.post('/devices', {
                modelId: this.deviceForm.modelId,
                name: this.deviceForm.name,
                description: this.deviceForm.description,
                rules: this.deviceForm.rules,
                details: this.deviceForm.details
              }).then((res) => {
                this.$message({
                  message: '已添加模型',
                  type: 'success'
                })
                this.submitting = false
                setTimeout(() => {
                  this.$router.replace('/things/device/' + res.data.id)
                }, 1000)
              }).catch(() => {
                this.submitting = false
              })
              break
            case 'ruleForm':
              this.deviceForm.rules.push(this.ruleForm)
              this.dialogAddRule = false
              break
            case 'detailForm':
              if (this.detailForm.name || this.detailForm.value) {
                this.deviceForm.details.push(this.detailForm)
              }
              this.dialogAddDetail = false
              break
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  border: 1px solid #E4E7ED;
  border-bottom: 0px;
  border-radius: 6px;
  overflow: hidden;
  max-width: 600px;
}
.key {
  text-align: right;
  padding-right: 1%;
}
.name {
  line-height: 40px;
}
.description {
  line-height: 30px;
}
.input {
  max-width: 400px;
}
.attrTitle {
  line-height: 45px;
}
.append {
  // border-top: 1px solid #E4E7ED;
  padding: 15px 0 15px 15px;
  text-align: center;
}
.button {
  width: 100px;
}
</style>
