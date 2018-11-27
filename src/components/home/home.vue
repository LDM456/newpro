<template>
<el-container class="container">
    <el-header class="header">
        <el-row>
            <!-- <el-col :span="4">
                <div class="grid-content bg-purple">
                    <img src="@/assets/img/logo.png" alt="无法显示">
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple-light">
                    电商后台管理系统
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <a href="javascript:">退出</a>
                </div>
            </el-col> -->
        </el-row>
    </el-header>
    <el-container class="container">
        <el-aside width="200px" class="aside">Aside</el-aside>
        <el-main class="main">Main</el-main>
    </el-container>
</el-container>
</template>

<script>
export default {

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
