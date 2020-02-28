<template>
  <div>
    <el-form>
      <el-form-item label="名称：" label-width="100px" style="max-width: 400px;">
        {{device.name}}
      </el-form-item>
      <el-form-item label="描述：" label-width="100px" style="max-width: 400px;">
        {{device.description}}
      </el-form-item>
      <el-form-item label="创建时间：" label-width="100px" style="max-width: 400px;">
        {{device.createdAt | format}}
      </el-form-item>
      <el-form-item label="状态：" label-width="100px">
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
            prop="current_value"
            label="当前值">
          </el-table-column>
          <el-table-column
            prop="unit"
            label="单位">
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    device: Object,
    model: Object
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

</style>
