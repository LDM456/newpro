<template>
<el-card class="goods_card">
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <el-row style="margin:20px 10px">
        <el-col>
            <el-input placeholder="请输入内容" v-model="goodsSearch" clearable class="inputtext">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success" @click="addGoods">添加商品</el-button>
        </el-col>
    </el-row>
    <!-- 商品列表 -->
    <el-table :data="goodlist" border style="width: 100%;" height="380">
        <el-table-column type="index" label="#" width="100">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="580">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品单价" width="80">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="80">
        </el-table-column>
        <el-table-column prop="add_time" label="创建日期" width="110">
            <template slot-scope="goodlist">
                {{goodlist.row.add_time | fmdate}}
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button :plain='true' size='mini' type="primary" icon="el-icon-edit" circle></el-button>
            <!-- scope的值就是tableData，其里面包含着userID -->
            <el-button :plain='true' size='mini' type="danger" icon="el-icon-delete" circle></el-button>
            </template>
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      goodsSearch: '',
      //   商品列表
      goodlist: [],
      query: 1, // 查询参数
      pagesize: 10, // 每页显示条数
      pagenum: 1 // 当前页码
    }
  },
  mounted () {
    this.getAllgoods()
  },
  methods: {
    //   添加商品按钮
    addGoods () {
      this.$router.push({
        name: 'addgoods'
      })
    },
    // 获取商品列表
    async getAllgoods () {
      const res = await this.$axios.get(`goods?query=${this.query}&pagesize=${this.pagesize}&pagenum=${this.pagenum}`)
      console.log(res)
      this.goodlist = res.data.data.goods
    }
  }
}
</script>

<style>
.goods_card {
    height: 99%;
}

.inputtext {
    width: 300px;
}
</style>
