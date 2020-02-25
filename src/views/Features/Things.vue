<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>模型</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-table
        :data="list"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="180"
          sortable>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          sortable>
        </el-table-column>
        <el-table-column
          prop="updatedAt"
          label="修改时间"
          sortable>
        </el-table-column>
        <el-table-column label="操作">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="device">
      <h3>设备</h3>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'list': [
        {
          'id': 1,
          'name': '1',
          'description': 'sss',
          'createdAt': 1582275662000,
          'updatedAt': 1582290811000
        },
        {
          'id': 2,
          'name': 'test',
          'description': 'xxx',
          'createdAt': 1582290566000,
          'updatedAt': 1582290566000
        },
        {
          'id': 3,
          'name': '1',
          'description': 'sss',
          'createdAt': 1582290825000,
          'updatedAt': 1582290836000
        },
        {
          'id': 4,
          'name': '1',
          'description': 'sss',
          'createdAt': 1582290845000,
          'updatedAt': 1582290853000
        },
        {
          'id': 5,
          'name': '1',
          'description': 'sss',
          'createdAt': 1582290940000,
          'updatedAt': 1582290954000
        },
        {
          'id': 6,
          'name': 'test',
          'description': 'ccc',
          'createdAt': 1582291051000,
          'updatedAt': 1582291051000
        },
        {
          'id': 7,
          'name': 'test',
          'description': 'ccc',
          'createdAt': 1582291051000,
          'updatedAt': 1582291051000
        },
        {
          'id': 8,
          'name': 'test',
          'description': 'ccc',
          'createdAt': 1582291052000,
          'updatedAt': 1582291052000
        },
        {
          'id': 9,
          'name': 'test',
          'description': 'ccc',
          'createdAt': 1582291053000,
          'updatedAt': 1582291053000
        },
        {
          'id': 10,
          'name': 'test',
          'description': 'ccc',
          'createdAt': 1582291053000,
          'updatedAt': 1582291053000
        },
        {
          'id': 11,
          'name': 'test',
          'description': 'ccc',
          'createdAt': 1582291054000,
          'updatedAt': 1582291054000
        },
        {
          'id': 12,
          'name': 'test',
          'description': 'ccc',
          'createdAt': 1582291055000,
          'updatedAt': 1582291055000
        },
        {
          'id': 13,
          'name': 'test',
          'description': 'ccc',
          'createdAt': 1582291056000,
          'updatedAt': 1582291056000
        },
        {
          'id': 14,
          'name': 'test',
          'description': 'ccc',
          'createdAt': 1582291057000,
          'updatedAt': 1582291057000
        }
      ]
    }
  }
}
</script>

<style>

</style>
