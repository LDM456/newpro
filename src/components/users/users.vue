<template>
<el-card class="box-card">
    <!-- 导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框  是标签在一行上显示 使用el-row -->
    <el-row class="elRow">
        <el-col>
            <el-input placeholder="请输入内容" v-model="query" class="inputText" clearable @clear="clear()">
                <el-button @click="searchUser(query)" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button @click="userAdd()" type="success">用户添加</el-button>
        </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" stripe style="width: 100%; max-height:300px ;overflow:auto">
        <el-table-column type="index" label="#" width="50">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column label="添加时间">
            <!-- 如果单元格内显示的内容不是字符串（文本）
                需要给被显示的内容外层包裹一个template

                template内部都要用数据 设置slot-scop属性
                该属性的值是要用数据create_time的数据源tableData

                slot-scope的值tableData 其实就是el-table绑定的数据 tableData
                tableData.row -> 数组中的每个对象
             -->
            <template slot-scope="tableData">
                {{tableData.row.create_time | fmdate}}
            </template>
        </el-table-column>
        <el-table-column label="状态">
            <template slot-scope="scope">
                <el-switch @change="changeState(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
                <el-button @click="editUser(scope.row.id)" :plain='true' :size='size' type="primary" icon="el-icon-edit" circle></el-button>
                <!-- scope的值就是tableData，其里面包含着userID -->
                <el-button @click="delUser(scope.row.id)" :plain='true' :size='size' type="danger" icon="el-icon-delete" circle></el-button>
                <el-button @click="assignRole(scope.row)" :plain='true' :size='size' type="success" icon="el-icon-check" circle></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <!-- 增加用户的 弹出层 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd" :width='width'>
        <el-form v-model="form">
            <el-form-item label="用户名" label-width='70px'>
                <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width='70px'>
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width='70px'>
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width='70px'>
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAdd()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 修改用户的 弹出层 -->
    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisibleEdit" :width='width'>
        <el-form v-model="form">
            <el-form-item label="用户名" label-width='70px'>
                <el-input v-model="form.username" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width='70px'>
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width='70px'>
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 分配角色功能 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole" :width='width'>
        <el-form v-model="form">
            <el-form-item label="用户名" label-width='70px'>
                {{username}}
            </el-form-item>
            <el-form-item label="角色" label-width='70px'>
                <!-- 如果select的绑定的数据的值roleID，和option的value的值item.id一样
              就会显示该option的值  也就是说显示获取到的用户的角色名称-->
                <!-- 下拉框显示角色 -->
                <!-- {{roleID}} -->
                <el-select v-model="roleID">
                    <el-option label="请选择" :value="-1" disabled></el-option>
                    <el-option v-for="(item,i) in rolesList" :key="i" :label="item.roleName" :value="item.id">
                    </el-option>
                </el-select>

            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
            <el-button type="primary" @click="handleRole()">确 定</el-button>
        </div>
    </el-dialog>

</el-card>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      // 表单数据
      tableData: [
        // 表格绑定的数据
        {
          //   username: '',
          //   email: '',
          //   mobile: '',
          //   create_time: 12,
          //   mg_state: true
        }

      ],
      pagenum: 1,
      pagesize: 4,
      total: -1,
      size: 'mini',
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      width: '40%',
      // 弹出层的form
      form: {},
      // 用户列表
      users: [],
      // 用户名
      username: '',
      // 角色列表
      rolesList: [],
      // 用户ID
      usersID: -1,
      // 角色ID
      roleID: -1

    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    //   1 - 获取用户列表
    async getUsers () {
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$axios.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.log(res)
      const {
        meta: {
          status
        },
        data: {
          total,
          users
        }
      } = res.data
      if (status === 200) {
        // this.$message.success(msg)
        this.tableData = users
        this.usersID = users.id
        this.total = total
      }
    },
    // 2 - 搜索关键词查询用户
    searchUser () {
      // 这里不用再传值过来，因为在获取列表时，已经将query放进请求头里了
      this.getUsers()
    },
    // 2.1 - 点击输入框中的x时，的事件
    clear () {
      this.getUsers()
    },
    // 4 - 分页功能
    sizeChange (val) {
      // console.log(`每页${val}页`)
      this.pagesize = val
      this.pagenum = 1
      this.getUsers()
    },
    currentChange (val) {
      this.pagenum = val
      this.getUsers()
    },
    // 5 - 增删改功能
    // 5.1-增加功能
    userAdd () {
      this.dialogFormVisibleAdd = true
    },
    async handleAdd () {
      const res = await this.$axios.post('users', this.form)
      const {
        meta: {
          status,
          msg
        }
      } = res.data
      if (status === 201) {
        this.$message.success(msg)
        this.dialogFormVisibleAdd = false
        this.getUsers()
      } else {
        this.$message.error(msg)
      }
    },
    // 5.2- 删除功能
    delUser (userID) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        //   发送删除请求:id--->用户id
        // data中找userID
        // 将ueserID以形参传进来
        const res = await this.$axios.delete(`users/${userID}`)
        const {
          meta: {
            status
          }
        } = res.data
        if (status === 200) {
          this.getUsers()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 5.3 修改功能
    async editUser (usersID) {
      this.dialogFormVisibleEdit = true
      const res = await this.$axios.get(`users/${usersID}`)
      this.form = res.data.data
      // console.log(res)
      // console.log(this.form)
    },
    // 5.3.1点击修改按钮提交请求
    async handleEdit () {
      const res = await this.$axios.put(`users/${this.form.id}`, this.form)
      const {
        meta: {
          status,
          msg
        }
      } = res.data
      if (status === 200) {
        this.$message.success(msg)
        this.getUsers()
      }
      this.dialogFormVisibleEdit = false
    },
    // 6 改变用户状态
    async changeState (user) {
      // console.log(111)
      const res = await this.$axios.put(`users/${user.id}/state/${user.mg_state}`)
      // console.log(res)
      const {
        meta: {
          status,
          msg
        }
      } = res.data
      if (status === 200) {
        this.$message.success(msg)
      }
    },
    // 7 分配角色按钮功能
    async assignRole (user) {
      this.dialogFormVisibleRole = true
      // 获取点击的用户的用户名和用户ID
      this.username = user.username
      this.usersID = user.id
      // 获取角色列表-获取角色ID
      const res = await this.$axios.get(`users/${this.usersID}`)
      /* 如果select的绑定的数据的值roleID，和option的value的值item.id一样
                    就会显示该option的值  也就是说显示获取到的用户的角色名称- */
      this.roleID = res.data.data.rid
      // 获取所有的角色
      const res1 = await this.$axios.get(`roles`)
      this.rolesList = res1.data.data
    },
    // 7 - 1分配角色确认修改
    async handleRole () {
      // users/:id/role
      // :id 要修改的用户的id值
      // 请求体中rid修改的新值 {rid：角色id}
      const res = await this.$axios.put(`users/${this.usersID}/role`, {rid: this.roleID})
      const {meta: {status, msg}} = res.data
      if (status === 200) {
        this.$message.success(msg)
      }
      this.dialogFormVisibleRole = false
    }
  }
}
</script>

<style>
.box-card {
    height: 100%;
    /* overflow: auto; */
}

.inputText {
    width: 300px;
}

.elRow {
    margin-top: 20px;
}

.elDialog {
    height: 500px;
}
</style>
