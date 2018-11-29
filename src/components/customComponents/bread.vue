<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <my-bread level1="用户管理" level2="用户列表"></my-bread> -->
</template>

<script>
export default {
  data () {
    return {
    //   level1: '',
    //   level2: ''
    }
  },
  //   props值 字符串数组
  // props 中的值的用法和data数据中的用法一样
  // props 中的数据 来源于 使用组件时传的值
  // props 中的数据也是该组件的属性 <child-a :msg="as">
  props: ['level1', 'level2']
}
</script>

<style>

</style>
