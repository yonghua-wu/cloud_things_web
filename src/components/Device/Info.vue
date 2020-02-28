<template>
  <div>
    <el-form>
      <el-form-item label="名称：" label-width="100px" style="max-width: 400px;">
        {{device.name}}
      </el-form-item>
      <el-form-item label="描述：" label-width="100px" style="max-width: 400px;">
        {{device.description}}
      </el-form-item>
      <el-form-item label="使用模型：" label-width="100px" style="max-width: 400px;">
        {{model.name}}
      </el-form-item>
      <el-form-item label="key：" label-width="100px" style="max-width: 400px;">
        <span>{{device.key}}</span>
        <el-popconfirm
          confirmButtonText='好的'
          cancelButtonText='不用了'
          icon="el-icon-info"
          iconColor="red"
          @onConfirm="resetKey"
          title="这会导致之前的key失效，确定？">
          <el-button slot="reference" size="mini" style="margin-left: 10px;">重新获取</el-button>
        </el-popconfirm>
      </el-form-item>
      <el-form-item label="修改时间：" label-width="100px" style="max-width: 400px;">
        {{device.updatedAt | format}}
      </el-form-item>
      <el-form-item label="创建时间：" label-width="100px" style="max-width: 400px;">
        {{device.createdAt | format}}
      </el-form-item>
      <el-form-item label="设备描述：" label-width="100px">
        <el-table
          :data="device.details"
          class="table">
          <el-table-column
            prop="name"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="value"
            label="值">
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="通知规则：" label-width="100px">
        <el-table
          :data="device.rules"
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
  methods: {
    resetKey () {
      this.$emit('reset-key')
    }
  }
}
</script>

<style>

</style>
