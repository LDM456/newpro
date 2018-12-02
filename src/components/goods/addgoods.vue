/* eslint-disable no-tabs */
<template>
<el-card class="addgoodscard">
    <my-bread level1="商品管理" level2="商品列表" level3="添加商品"></my-bread>
    <el-alert show-icon center title="添加商品信息" type="info" class="alterinfo" :closable="false">
    </el-alert>
    <!-- 步骤条 -->
    <el-steps :active="1*active" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- tabs标签页 -->
    <el-form label-position="top" label-width="80px" v-model="form"  class="goodsform" >
        <el-tabs v-model="active" tab-position="left" @tab-click="totabchange()">
            <!-- 基本信息组件 -->
            <el-tab-pane name='1' label="基本信息">

                <!-- 级联选择器 -->
                <el-form-item label="商品分类">
                    <el-cascader clearable expand-trigger="hover" :options="options" v-model="selectedoptions" :props="defaultProp" @change="handleChange()"></el-cascader>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="form.goods_nam"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="form.goods_price"></el-input>
                </el-form-item>
                <el-form-item label="商品重量">
                    <el-input v-model="form.goods_weight"></el-input>
                </el-form-item>
                <el-form-item label="商品数量">
                    <el-input v-model="form.goods_number"></el-input>
                </el-form-item>

            </el-tab-pane>
            <!-- 商品参数组件 -->
            <el-tab-pane name='2' label="商品参数">
                <el-form-item v-for="(item,index) in arrDyparams" :key="index" :label="item.attr_name">
                    <el-checkbox-group v-model="item.attr_vals">
                        <el-checkbox :label="item2" v-for="(item2,index) in item.attr_vals" :key="index" class="itemsize"></el-checkbox>
                        <!-- 需要将item.attr_vals的字符串遍历为数组 -->
                    </el-checkbox-group>
                </el-form-item>
            </el-tab-pane>
            <!-- 商品属性组件 -->
            <el-tab-pane name='3' label="商品属性">
                <el-form-item :label="item.attr_name" v-for="(item,index) in arrStaticparams" :key="index">
                    <el-input v-model="item.attr_vals"></el-input>
                </el-form-item>
            </el-tab-pane>
            <!-- 商品图片组件 -->
            <el-tab-pane name='4' label="商品图片">
                <el-upload class="upload-demo"
                     action="http://localhost:8888/api/private/v1/upload"
                     :headers="headers"
                     :on-preview="handlePreview"
                     :on-remove="handleRemove"
                     :on-success="handleSuccess"
                     :file-list="fileList"
                     list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-tab-pane>
            <!-- 商品内容组件 -->
            <el-tab-pane name='5' label="商品内容">
                <el-form-item >
                    <el-button type="primary" @click="addGoods">添加商品信息</el-button>
                    <!-- 富文本编辑器 -->
                <quill-editor class="quilleditor" v-model="form.goods_introduce"></quill-editor>
                </el-form-item>
            </el-tab-pane>
        </el-tabs>
    </el-form>
</el-card>
</template>

<script>
// 局部引入组件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      active: '1',
      //   存储在form的里值
      // goods_name 商品名称    不能为空
      // goods_cat  以为','分割的分类列表   不能为空=>就是级联选择器的seletedoptions
      // goods_price价格 不能为空
      // goods_number   数量    不能为空
      // goods_weight   重量    不能为空
      // goods_introduce    介绍    可以为空
      // pics   上传的图片临时路径（对象）  可以为空
      // attrs  商品的参数（数组）  可以为空 动态参数和静态参数的组成--数组
      form: {
        goods_nam: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',

        // 还未处理的参数
        goods_cat: '',
        pics: [], // 存放的是对象
        attrs: []
      },
      //   商品分类列表
      options: [],
      selectedoptions: [1, 3, 6],
      defaultProp: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 动态参数的数组
      arrDyparams: [],
      //   静态数组的参数
      arrStaticparams: [],
      //   文件上传的参数
      fileList: [],
      headers: {Authorization: localStorage.getItem('token')}
    }
  },
  created () {
    this.getAllgoods()
  },
  methods: {
    //   添加商品信息
    async addGoods () {
      this.form.goods_cat = this.selectedoptions.join(',') // 是一个字符串数组
      // pics: [],中{"pic":??}
      // pics在上传和移除图片时，进行添加和删除[].findIndex(item=>{}) 遍历 是把符合条件元素的索引进行返回
      // 再发送请求之前处理form中的数据
      const res = await this.$axios.post(`goods`, this.form)
      console.log(res)
    },
    //   上传图片的相关方法
    //   图片预览的方法
    // file形参，存储的是返回的文件信息
    // 上传图片还必须设置头部
    handlePreview (file) {
      console.log('预览')
      console.log(file)
    },
    // 移除图片时所触发的事件
    handleRemove (file) {
    // file.response.data.tmp_path 图片临时上传的路径
      // this.form.pics移除当前的图片
      //   获取索引
      let index = this.form.pics.findIndex((item) => {
        return item.pics === file.response.data.tmp_path
      })
      //   根据index移除
      this.form.pics.splice(index, 1)
      // this.form.pics
      console.log(this.form.pics)
    },
    // 上传成功是的方法
    handleSuccess (file) {
    // file.data.tmp_path 图片上传的临时路径
      //   给form.pics添加一个对象
      this.form.pics.push({
        pic: file.data.tmp_path
      })
      console.log(file)
      console.log(this.form.pics)
    },
    //   改变tab时触发该事件
    async totabchange () {
      if (this.active === '2') {
        if (this.selectedoptions.length !== 3) {
          this.$message.error('请选择商品分类')
        } else {
          // 动态参数
          // categories/:id/attributes
          //   id 就是数组的第三个值
          const res = await this.$axios.get(`categories/${this.selectedoptions[2]}/attributes?sel=many`)
          //   console.log(res)
          this.arrDyparams = res.data.data
          //   并不是所有的 三级分类都有动态参数 []->报错 所有要判断是否为空数组
          this.arrDyparams.forEach(item => {
            item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(',')
          })
        }
      } else if (this.active === '3') {
        if (this.selectedoptions.length !== 3) {
          this.$message.error('请选择商品分类')
        } else {
          // 获取静态参数
          const res = await this.$axios.get(`categories/${this.selectedoptions[2]}/attributes?sel=only`)
          //   console.log(res)
          this.arrStaticparams = res.data.data
        }
      }
    },
    handleChange () {

    },
    // 获取 商品数据列表
    async getAllgoods () {
      const res = await this.$axios.get(`categories?type=3`)
      //   console.log(res)
      this.options = res.data.data
    }
  }
}
</script>

<style>
.alterinfo {
    margin: 10px;
}

.addgoodscard {
    height: 99%;
}

.goodsform {
    height: 400px;
    overflow: auto;
}

.goodsform .itemsize {
    border: 1px solid #409EFF;
    border-radius: 5px;
    width: 60px;
    text-align: center;
    margin-left: 10px;
}
.ql-container .ql-snow{
    min-height: 200px !important;
    margin-bottom: 20px;
}
</style>
