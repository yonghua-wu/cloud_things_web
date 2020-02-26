<template>
  <div>
    <nav-header :title="'模型'" />
    <el-form :model="model" :rules="isEdit?rules:{}">
      <el-form-item label="名称" label-width="100px" prop="name">
        <div v-if="!isEdit">{{model.name}}</div>
        <el-input
          v-else
          class="input"
          placeholder="模型名称，3-20字符"
          maxlength="20"
          minlength="3"
          show-word-limit
          v-model.trim="model.name"
          :disabled="!isAdd"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" label-width="100px">
        <div v-if="!isEdit">{{model.description}}</div>
        <el-input
          v-else
          class="input"
          type="textarea"
          :rows="3"
          maxlength="200"
          show-word-limit
          placeholder="模型描述"
          v-model.trim="model.description">
        </el-input>
      </el-form-item>
      <el-form-item label="属性" label-width="100px" prop="attr">
        <el-table
          :data="model.attributes"
          class="table">
          <el-table-column
            prop="name"
            label="属性名称">
          </el-table-column>
          <el-table-column
            prop="view_name"
            label="显示名称">
          </el-table-column>
          <el-table-column
            prop="value_type"
            label="类型">
          </el-table-column>
          <el-table-column
            prop="default_value"
            label="默认值">
          </el-table-column>
          <el-table-column
            prop="unit"
            label="单位">
          </el-table-column>
          <el-table-column
            v-if="isEdit"
            label="操作"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-popconfirm
                confirmButtonText='删除'
                cancelButtonText='不用了'
                icon="el-icon-info"
                iconColor="red"
                title="确定删除这条属性吗？"
                @onConfirm="delAttr(scope.$index)">
                <el-button slot="reference" size="mini" type="danger" plain=""><span>删除...</span></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
          <template slot="empty" v-if="isEdit">
            <el-link :underline="false" @click="showDialogAddAttr"><i class="el-icon-plus"></i> 添加属性...</el-link>
          </template>
          <template slot="append" v-if="model.attributes.length > 0 && isEdit">
            <div class="append">
              <el-link :underline="false" @click="showDialogAddAttr"><i class="el-icon-plus"></i> 添加属性...</el-link>
            </div>
          </template>
        </el-table>
      </el-form-item>
      <el-form-item label-width="100px" label="修改时间" v-if="!isAdd && !isEdit">
        {{model.updatedAt | format}}
      </el-form-item>
      <el-form-item label-width="100px" label="创建时间" v-if="!isAdd && !isEdit">
        {{model.createdAt | format}}
      </el-form-item>
      <el-form-item label-width="100px">
        <template v-if="isEdit">
          <el-button class="button" type="primary" @click="onSubmit" :loading="submitting">提交{{submitting?'中':''}}</el-button>
          <el-button class="button" @click="onCancal" :disabled="submitting">取消</el-button>
        </template>
        <template v-else>
          <el-button class="button" type="primary" @click="isEdit = true">编辑</el-button>
        </template>
      </el-form-item>
    </el-form>
    <el-dialog title="添加属性" :visible.sync="dialogAddAttr" width="500px">
      <el-form :model="form" :rules="rules">
        <el-form-item label="属性名" label-width="100px" prop="name">
          <el-input v-model.trim="form.name" autocomplete="off" placeholder="属性名" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="显示名称" label-width="100px" prop="view_name">
          <el-input v-model.trim="form.view_name" autocomplete="off" placeholder="显示名称" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="100px" prop="value_type">
          <el-select v-model="form.value_type" placeholder="请选择数据类型">
            <el-option label="Number" value="Number"></el-option>
            <el-option label="String" value="String"></el-option>
            <el-option label="Boolean" value="Boolean"></el-option>
            <el-option label="Array" value="Array"></el-option>
            <el-option label="Object" value="Object"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="默认值" label-width="100px">
          <el-input v-model.trim="form.default_value" autocomplete="off" placeholder="默认值" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="单位" label-width="100px">
          <el-input v-model.trim="form.unit" autocomplete="off" placeholder="单位（℃,℉,%...）" maxlength="30" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddAttr = false">取 消</el-button>
        <el-button type="primary" @click="addAttr">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import navHeader from '../../../components/NavHeader'
// import moment from 'moment'

export default {
  components: {
    'nav-header': navHeader
  },
  // filters: {
  //   Format (value) {
  //     return moment(new Date(value)).format('YYYY-MM-DD HH:mm:ss')
  //   }
  // },
  data () {
    return {
      oleModel: {
        id: null,
        name: '',
        description: '',
        attributes: []
      },
      model: {
        id: null,
        name: '',
        description: '',
        attributes: []
      },
      form: {
        name: '',
        view_name: '',
        value_type: 'Number',
        default_value: '',
        unit: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入属性名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_]{3,12}$/, message: '长度在3到30个(a-z,A-Z,0-9)', trigger: 'blur' }
        ],
        attr: [
          { required: true, message: ' ' }
        ],
        view_name: [
          { required: true, message: '请输入显示名称', trigger: 'blur' }
        ],
        value_type: [
          { required: true, message: '请输入选择类型', trigger: 'blur' }
        ]
      },
      dialogAddAttr: false,
      isEdit: true,
      isAdd: false,
      submitting: false
    }
  },
  mounted () {
    const id = this.$route.params.id
    if (!isNaN(Number(id))) {
      this.model.id = Number(id)
      this.loadData()
      this.isAdd = false
      this.isEdit = false
    } else {
      this.isAdd = true
      this.isEdit = true
    }
  },
  methods: {
    loadData () {
      const loading = this.$loading()
      this.$http.ct.get('/models/' + this.model.id).then(res => {
        this.model = res.data
        this.oleModel = JSON.parse(JSON.stringify(this.model))
        loading.close()
      }).catch(() => {
        loading.close()
      })
    },
    showDialogAddAttr () {
      this.dialogAddAttr = true
      this.form = {
        name: '',
        view_name: '',
        value_type: 'Number',
        default_value: '',
        unit: ''
      }
    },
    delAttr (index) {
      // eslint-disable-next-line
      console.log(index)
      // delete this.model.attributes[index]
      this.model.attributes.splice(index, 1)
    },
    addAttr () {
      if (this.form.name && this.form.view_name && this.form.value_type && /^[a-zA-Z0-9_]{3,12}$/.test(this.form.name)) {
        this.model.attributes.push(this.form)
        this.dialogAddAttr = false
      } else {
        this.$message({
          message: `请检查输入是否正确`,
          type: 'error'
        })
      }
    },
    onCancal () {
      if (this.isAdd) {
        this.$router.go(-1)
      } else if (this.isEdit) {
        this.model = JSON.parse(JSON.stringify(this.oleModel))
        this.isEdit = false
        // this.$router.replace('/things/models/' + this.model.id)
      }
    },
    onSubmit () {
      if (!this.model.name) {
        this.$message({
          message: `请输入名称`,
          type: 'error'
        })
        return
      }
      if (!(/^[a-zA-Z0-9_]{3,12}$/.test(this.model.name))) {
        this.$message({
          message: `名称不合法`,
          type: 'error'
        })
        return
      }
      if (this.model.attributes.length === 0) {
        this.$message({
          message: `至少要添加一条属性`,
          type: 'error'
        })
        return
      }
      this.submitting = true
      if (this.isAdd) {
        this.$http.ct.post('/models', {
          name: this.model.name,
          description: this.model.description,
          attributes: this.model.attributes
        }).then((res) => {
          this.$message({
            message: '已添加模型',
            type: 'success'
          })
          this.isEdit = false
          this.isAdd = false
          this.$router.replace('/things/model/' + res.data.id)
          this.submitting = false
        }).catch(() => {
          this.submitting = false
        })
      } else {
        this.$http.ct.patch('/models/' + this.model.id, {
          description: this.model.description,
          attributes: this.model.attributes
        }).then(res => {
          this.$message({
            message: '已修改模型',
            type: 'success'
          })
          this.model.id = res.data.id
          this.loadData()
          this.isEdit = false
          this.submitting = false
        }).catch(() => {
          this.submitting = false
        })
      }
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
