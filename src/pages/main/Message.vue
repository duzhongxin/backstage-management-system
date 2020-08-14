<template>
  <div id="box">
    <div id="title">
      <p>管理员信息</p>
    </div>
    <div id="content">
      <p>管理员ID: {{data.id}}</p>
      <p>账号: {{data.account}}</p>
      <p>用户组: {{data.userGroup}}</p>
      <p>创建时间: {{timechange(data.ctime)}}</p>
      <p>
        <span>修改头像:</span>
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :data="imgdata"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </p>
    </div>
  </div>
</template>

<script>
import { accountinfo } from "@/api/apis";
var moment = require("moment");
export default {
  data() {
    return {
      data: {},
      imgdata: {},
    };
  },
  methods: {
    timechange(str) {
      var ctime = moment(str).format("YYYY-MM-DD HH:mm:ss");
      return ctime;
    },
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.$bus.$emit("infoimg");
        this.$message({
          message: res.msg,
          type: "success",
        });
      } else {
        this.$message.error(res.msg);
      }
    },
  },
  created() {
    this.imgdata = { id: localStorage.id };
    accountinfo(localStorage.id).then((res) => {
      this.data = res.data.accountInfo;
    });
  },
};
</script>

<style lang="less" scoped>
#box {
  background-color: #fff;
  font-size: 18px;
}
#title {
  p {
    padding: 15px;
    border-bottom: 1px solid #ccc;
  }
}
#content {
  padding: 20px;
  p {
    span {
      display: block;
      margin-bottom: 20px;
    }
    padding: 20px;
  }
  p:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
}
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-icon-plus {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>