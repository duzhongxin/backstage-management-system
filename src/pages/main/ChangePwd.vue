<template>
  <div id="box">
    <div id="title">
      <h4>修改密码</h4>
    </div>
    <p>
      <span>原密码</span>
      <el-input placeholder="请输入内容" v-model="oldpwd" show-password @blur="oldowdsure"></el-input>
      <b>{{err}}</b>
    </p>
    <p>
      <span>新密码</span>
      <el-input placeholder="请输入内容" v-model="pwd" show-password></el-input>
    </p>
    <p>
      <span>确认密码</span>
      <el-input placeholder="请输入内容" v-model="surepwd" show-password @blur="pwdsure"></el-input>
      <b>{{err_pwd}}</b>
    </p>
    <div id="btns">
      <el-button type="primary" @click="surebtn">确定</el-button>
      <el-button @click="input_btn">重置</el-button>
    </div>
  </div>
</template>

<script>
import { editpwd } from "@/api/apis";
import { checkoldpwd } from "@/api/apis";
export default {
  data() {
    return {
      oldpwd: "",
      pwd: "",
      surepwd: "",
      err: "",
      err_pwd: "",
    };
  },
  methods: {
    surebtn() {
      editpwd(this.pwd, localStorage.id).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success",
          });
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    oldowdsure() {
      checkoldpwd(this.oldpwd, localStorage.id).then((res) => {
        if (res.data.code == 0) {
          this.err = res.data.msg;
        } else {
          this.err = res.data.msg;
        }
      });
    },
    pwdsure() {
      if (this.pwd == this.surepwd) {
        this.err_pwd = "";
      } else {
        this.err_pwd = "两次输入的密码不同！";
      }
    },
    input_btn() {
      this.oldpwd = "";
      this.pwd = "";
      this.surepwd = "";
    },
  },
};
</script>

<style lang="less" scoped>
#box {
  background-color: #fff;
  padding: 20px;
  p {
    span {
      width: 80px;
      text-align: right;
    }
    b {
      margin-left: 20px;
    }
    line-height: 40px;
    display: flex;
    padding: 20px 0;
    .el-input {
      width: 300px;
      margin-left: 20px;
    }
  }
}
#btns {
  margin-left: 100px;
}
#title {
  padding-bottom: 10px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
</style>