<template>
<el-card class="usercard">
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row>
        <el-col>
            <el-button type="primary" class="btn">添加角色</el-button>
        </el-col>
    </el-row>
    <el-table :data="roleList" style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="props">
                <!-- 一级权限 -->
                <el-row v-for="level1 in props.row.children" :key="level1.id">
                    <!-- props.row里面是roleLst里的对象 包含children[{},{}] id roleDesc roleName -->
                    <el-col :span="4">
                        <el-tag @close="delRight(props.row,level1.id)" closable>{{level1.authName}}</el-tag>
                        <span class="gt">&nbsp;&gt;</span>
                    </el-col>
                    <el-col :span="20">
                        <!-- 二级权限 -->
                        <el-row v-for="level2 in level1.children" :key="level2.id">
                            <el-col :span="4">
                                <el-tag @close="delRight(props.row,level2.id)" type="success" closable>{{level2.authName}}</el-tag>
                                <span class="gt">&nbsp;&gt;</span>

                            </el-col>
                            <el-col :span="20">
                                <!-- 三级权限 -->
                                <el-tag @close="delRight(props.row,level3.id)" type="warning" closable v-for="level3 in level2.children" :key="level3.id">{{level3.authName}}</el-tag>
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
                <el-button :plain='true' :size='size' type="danger" icon="el-icon-delete" circle></el-button>
                <el-button @click="getRights(scope.row)" :plain='true' :size='size' type="success" icon="el-icon-check" circle></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分配角色功能 -->
    <!-- :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]" -->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisibleRights" width='300'>
        <el-tree
        ref="tree"
        :data="roletree"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="choicerole"
        :props="defaultProps"
        class="roltree">
        </el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleRights = false">取 消</el-button>
            <el-button type="primary" @click="handleRight()">确 定</el-button>
        </div>
    </el-dialog>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      size: 'mini',
      roleList: [],
      //   管理权限汇总
      dialogFormVisibleRights: false,
      //   权限列表
      rightslist: [],
      //   属性表格的数据
      roletree: [],
      defaultProps: {
        label: 'authName',
        children: 'children'},
      choicerole: [],
      currentRoleId: -1
    }
  },
  created () {
    this.getAllrole()
  },
  methods: {
    async getAllrole () {
      const res = await this.$axios.get(`roles`)
      this.roleList = res.data.data
      //   console.log(this.roleList)
    },
    // 删除权限选项
    async delRight (role, rightID) {
      const res = await this.$axios.delete(`roles/${role.id}/rights/${rightID}`)
      //   更新权限列表只需要更新局部的，不需要重新加载整个列表
      //   删除成功返回里的剩余角色，直接赋值给该角色的children就可以
      role.children = res.data.data
    },
    // 获取权限
    async getRights (role) {
      this.dialogFormVisibleRights = true
      //   获取权限的id
      this.currentRoleId = role.id
      //   console.log(role)
      //   获取所有权限
      const res = await this.$axios.get(`rights/tree`)
      //   console.log(role)
      this.roletree = res.data.data
      //   for循环来获取权限的所有id
      let arrroleID = []
      role.children.forEach(level1 => {
        // arrroleID.push(level1.id)
        level1.children.forEach(level2 => {
        //   arrroleID.push(level2.id)
          level2.children.forEach(level3 => {
            arrroleID.push(level3.id)
          })
        })
      })

      this.choicerole = arrroleID
    //   console.log(this.roletree)
    },
    // 角色授权 确认
    async handleRight () {
      // roles/:roleId/rights
      // roleId = currentRoleId
      // rights 所有树形结构中 全选和半选的id的[]
      // 1在vue中操作元素 设置ref属性值 input ref="txt"
      // 2 this.$refs.(ref属性值).(js的方法名) this.$refs.txt.focus()

      // 全选的id 的数组arr1
      let arr1 = this.$refs.tree.getCheckedKeys()
      //   console.log(arr1)
      // 半选的id 的数组arr2
      let arr2 = this.$refs.tree.getHalfCheckedKeys()
      //   console.log(arr2)
      // ES6语法 展开运算符 ...数组或者对象
      let arr = [...arr1, ...arr2]
      const res = await this.$axios.post(`roles/${this.currentRoleId}/rights`, {rids: arr.join(',')})
      //   console.log(res)
      const {meta: {status, msg}} = res.data
      if (status === 200) {
        this.$message.success(msg)
      }

      this.dialogFormVisibleRights = false
      this.getAllrole()
    }
  }
}
</script>

<style>
.usercard {
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
.roltree{
    max-height: 300px;
    overflow: auto;
}
</style>
