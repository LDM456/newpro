<template>
<el-container class="container">
    <el-header class="header">
        <!-- 头部组件 -->
        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <img src="@/assets/img/logo.png" alt="无法显示">
                </div>
            </el-col>
            <el-col :span="18">
                <h2 class="middleTitle">电商后台管理系统</h2>
            </el-col>
            <el-col :span="1">
                <div class="grid-content bg-purple">
                    <a href="javascript:" class="logout" @click='logout()'>退出</a>
                </div>
            </el-col>
            <el-col :span="1">
                <div class="comment">{{time|timedata}}</div>
            </el-col>
        </el-row>
    </el-header>
    <el-container class="container">
        <!-- 侧边栏组件 -->
        <el-aside width="200px" class="aside" >
            <el-menu :router="true" default-active="2" class="el-menu-vertical-demo" :unique-opened='true'>

                <el-submenu :index="''+item.order" v-for="(item,index) in menus" :key="index">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{item.authName}}</span>
                    </template>
                    <el-menu-item :index="''+item2.path" v-for="(item2,index) in item.children" :key="index">
                        <i class="el-icon-setting"></i>
                        <span>{{item2.authName}}</span>
                    </el-menu-item>
                </el-submenu>

            </el-menu>
        </el-aside>
        <!-- 内容区域组件 -->
        <el-main class="main">
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      time: new Date(),
      //   菜单栏
      menus: []
    }
  },
  filters: {
    timedata (v) {
      return moment(v).format(' h:mm:ss ')
    }
  },
  beforeCreate () {
    // 更新时间
    // 进入首页进行权限验证
    // 获取localstorage中的token
    // const token = localStorage.getItem('token')
    // if (!token) {
    //   this.$router.push({name: 'login'})
    // }
  },
  created () {
    this.getMenus()
  },
  methods: {
    async getMenus () {
      const res = await this.$axios.get(`menus`)
      //   console.log(res)
      this.menus = res.data.data
    },
    //   退出按钮事件
    logout () {
      // 清空登录用户的缓存
      localStorage.clear()
      //   提示信息
      this.$message.success('退出成功')
      //   跳转到登录组件
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style>
.container {
    height: 100%;
}

.header {
    height: 60px;
    background-color: #b3c0d1;
    padding: 0;
    line-height: 60px;
}

.middleTitle {
    text-align: center;
    color: #fff;
}

.logout {
    text-decoration: none;
    margin-right: 20px;
}

.comment {
    font-size: 12px;
    text-align: center;
    height: 60px;
}

.aside {
    width: 200px;
    background-color: #fff;
}

.main {
    height: 100%;
    background-color: #e9eef3;
}
</style>
