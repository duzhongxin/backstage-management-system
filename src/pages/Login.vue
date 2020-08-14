<template>
  <div id="box">
    <div id="box_input">
      <h3>系统登录</h3>
      <el-input placeholder="请输入内容" clearable v-model="uname"></el-input>
      <el-input placeholder="请输入内容" show-password v-model="pwd"></el-input>
      <p class="err_msg">{{err}}</p>
      <el-button type="primary" @click="loginbtn">登录</el-button>
    </div>
  </div>
</template>

<script>
import { checkLogin } from "@/api/apis";
export default {
  data() {
    return {
      uname: "",
      pwd: "",
      err: "",
    };
  },
  methods: {
    loginbtn() {
      checkLogin(this.uname, this.pwd).then((res) => {
        if (res.data.code == 0) {
          localStorage.token = res.data.token;
          localStorage.role = res.data.role;
          localStorage.id = res.data.id;
          localStorage.uname = this.uname;
          this.$message({
            showClose: true,
            message: "恭喜你，登录成功！",
            type: "success",
          });
          this.$router.push("/Main/");
        } else {
          this.err = res.data.msg;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
#box {
  display: flex;
  height: 100%;
  background-color: #2d3a4b;
  justify-content: center;
  align-items: center;
}
#box_input {
  width: 400px;
  height: 220px;
  h3 {
    text-align: center;
    color: #fff;
  }

  .el-input {
    margin-top: 20px;
  }
  .el-button {
    width: 100%;
    margin-top: 20px;
  }
}
.err_msg {
  text-align: center;
  color: red;
  margin-top: 20px;
}
</style>