<template>
<div class="loginWarp">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
        <h2>用户登录</h2>
        <el-form-item label="用户名">
            <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formdata.password" type="password"></el-input>
        </el-form-item>
        <el-button @click.prevent="getLogin()" class="login-btn" type="primary">登&nbsp;录</el-button>
    </el-form>
</div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async getLogin () {
      const res = await this.$axios.post('login', this.formdata)
      // console.log(res)
      const {
        data,
        meta: {
          msg,
          status
        }
      } = res.data
      if (status === 200) {
        // 登录成功保存 token到localstorage中
        localStorage.setItem('token', data.token)
        this.$router.push({name: 'home'})
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style>
.loginWarp {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #324152;
}

.loginWarp .login-form {
    border-radius: 5px;
    width: 400px;
    background-color: #fff;
    padding: 25px 30px;
}

.loginWarp .login-btn {
    width: 100%;
    font-size: 20px;
}
</style>
