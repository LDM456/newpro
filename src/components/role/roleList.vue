<template>
<el-card>
    <!-- 面包屑 导航 -->
    <my-bread level1="权限列管理" level2="权限列表"></my-bread>
    <el-table :data="userList" style="width: 100%" :border="true" class="table">
        <el-table-column type="index" label="#" width="100">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180">
        </el-table-column>
        <el-table-column prop="path" label="路径">
        </el-table-column>
        <el-table-column  label="层级">
            <template slot-scope="scope">
                <!-- 获取的scope.row 中是 字符串数字 需要转化 -->
                <span v-if="scope.row.level === '0'">一级</span>
                <span v-if="scope.row.level === '1'">二级</span>
                <span v-if="scope.row.level === '2'">三级</span>
            </template>
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      userList: [{
        // index
        // authName
        // path
        // level
      }]
    }
  },
  created () {
    this.getRoles()
  },
  methods: {
    //   获取权限等级
    async getRoles () {
      const res = await this.$axios.get(`rights/list`)
      //   console.log(res)
      this.userList = res.data.data
    }
  }
}
</script>

<style>
.table {
    margin-top: 20px;
    max-height: 450px;
    overflow: auto;
}
</style>
