<template>
<el-card class="usercard">
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row>
        <el-col>
            <el-button type="primary" class="btn" >添加角色</el-button>
        </el-col>
    </el-row>
    <el-table :data="roleList" style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="props">
                <!-- 一级权限 -->
                <el-row v-for="level1 in props.row.children" :key="level1.id">
                    <!-- props.row里面是roleLst里的对象 包含children[{},{}] id roleDesc roleName -->
                    <el-col :span="4">
                        <el-tag closable>{{level1.authName}}</el-tag>
                        <span class="gt">&nbsp;&gt;</span>
                    </el-col>
                    <el-col :span="20">
                        <!-- 二级权限 -->
                        <el-row v-for="level2 in level1.children" :key="level2.id">
                            <el-col :span="4">
                                <el-tag type="success" closable>{{level2.authName}}</el-tag>
                                <span class="gt">&nbsp;&gt;</span>

                            </el-col>
                            <el-col :span="20">
                                <!-- 三级权限 -->
                                <el-tag type="warning" closable v-for="level3 in level2.children" :key="level3.id">{{level3.authName}}</el-tag>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <!-- 显示没有分配权限 -->
                <el-row v-if="props.row.children.length === 0">
                    <el-col>还未分配权限</el-col>
                </el-row>
            </template>
        </el-table-column>
        <el-table-column type="index" label="#" width="80">
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName">
        </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc">
        </el-table-column>
        <el-table-column label="操作" prop="desc">
            <template slot-scope="scope">
                <el-button :plain='true' :size='size' type="primary" icon="el-icon-edit" circle></el-button>
                <!-- scope的值就是tableData，其里面包含着userID -->
                <el-button  :plain='true' :size='size' type="danger" icon="el-icon-delete" circle></el-button>
                <el-button :plain='true' :size='size' type="success" icon="el-icon-check" circle></el-button>
            </template>
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      size: 'mini',
      roleList: []
      //   管理权限汇总
    }
  },
  created () {
    this.getAllrole()
  },
  methods: {
    async getAllrole () {
      const res = await this.$axios.get(`roles`)
      this.roleList = res.data.data
      console.log(this.roleList)
    }

  }
}
</script>

<style>
.usercard{
    height: 99%;
    /* max-height: 450px; */
    overflow: auto;
}
.btn {
    margin: 10px 0;
}

.gt {
    font-size: 16px;
    font-family: "宋体";
    font-weight: bold;
}
</style>
