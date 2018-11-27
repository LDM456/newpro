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
            <el-menu default-active="2" class="el-menu-vertical-demo" :unique-opened='true'>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-setting"></i>
                        <span>用户列表</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 2 -->
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-setting"></i>
                        <span>角色列表</span>
                    </el-menu-item>
                    <el-menu-item index="1-1">
                        <i class="el-icon-setting"></i>
                        <span>权限列表</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 3 -->
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品列表</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-setting"></i>
                        <span>商品参数</span>
                    </el-menu-item>
                    <el-menu-item index="1-1">
                        <i class="el-icon-setting"></i>
                        <span>分类参数</span>
                    </el-menu-item>
                    <el-menu-item index="1-1">
                        <i class="el-icon-setting"></i>
                        <span>商品分类</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 4 -->
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-setting"></i>
                        <span>订单列表</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 5 -->
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-setting"></i>
                        <span>数据报表</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <!-- 内容区域组件 -->
        <el-main class="main">Main</el-main>
    </el-container>
</el-container>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      time: new Date()
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
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({name: 'login'})
    }
  },
  methods: {
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
