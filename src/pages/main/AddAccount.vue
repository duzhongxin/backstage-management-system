<template>
  <div id="box">
    <div id="title">
      <h4>添加账号</h4>
    </div>
    <p>
      <span>账号</span>
      <el-input placeholder="请输入内容" clearable v-model="uname"></el-input>
    </p>
    <p>
      <span>密码</span>
      <el-input placeholder="请输入内容" show-password v-model="pwd"></el-input>
    </p>
    <p>
      <span>用户组</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.label"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
    </p>
    <div id="btns">
      <el-button type="primary" @click="surebtn">确定</el-button>
      <el-button @click="passbtn">重置</el-button>
    </div>
  </div>
</template>

<script>
import { add } from "@/api/apis";
export default {
  data() {
    return {
      options: [
        {
          label: "超级管理员",
        },
        {
          label: "普通管理员",
        },
      ],
      value: "",
      uname: "",
      pwd: "",
    };
  },
  methods: {
    surebtn() {
      add(this.uname, this.pwd, this.value).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success",
          });
          this.$router.push("/Main/AccountList");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    passbtn() {
      this.value = "";
      this.uname = "";
      this.pwd = "";
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
.el-select {
  margin-left: 20px;
}
</style>