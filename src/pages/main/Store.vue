<template>
  <div id="box">
    <div id="title">
      <h4>店铺管理</h4>
      <el-button type="primary" @click="sure_btn">保存</el-button>
    </div>
    <div>
      <p>
        <span>店铺名称</span>
        <el-input placeholder="请输入内容" v-model="value2"></el-input>
      </p>
      <p>
        <span>店铺公告</span>
        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="value3"></el-input>
      </p>
      <p>
        <span>店铺头像</span>
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/shop/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccesss"
        >
          <img v-if="url" :src="url" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </p>
      <p>
        <span>店铺图片</span>
        <!-- <img :src="item" v-for="(item,index) in pics" :key="index" /> -->
        <el-upload
          action="http://127.0.0.1:5000/shop/upload"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
          :file-list="fileList"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </p>
      <p>
        <span>配送费</span>
        <el-input placeholder="请输入内容" v-model="value4"></el-input>
      </p>
      <p>
        <span>配送时间</span>
        <el-input placeholder="请输入内容" v-model="value5"></el-input>
      </p>
      <p>
        <span>配送描述</span>
        <el-input placeholder="请输入内容" v-model="value6"></el-input>
      </p>
      <p>
        <span>店铺评分</span>
        <el-input placeholder="请输入内容" v-model="value7"></el-input>
      </p>
      <p>
        <span>销量</span>
        <el-input placeholder="请输入内容" v-model="value8"></el-input>
      </p>
      <p>
        <span>活动</span>
        <el-checkbox-group v-model="supports">
          <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
          <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
          <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
          <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
          <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
        </el-checkbox-group>
      </p>
      <p>
        <span>营业时间</span>
        <el-time-picker
          is-range
          v-model="value1"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </p>
    </div>
  </div>
</template>

<script>
import { info } from "@/api/apis";
import { shopedit } from "@/api/apis";

var moment = require("moment");
export default {
  data() {
    return {
      value1: [],
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      value7: "",
      value8: "",
      url: "",
      supports: [],
      dialogImageUrl: "",
      dialogVisible: false,
      pics: [],
      imgruls: [],
      id: "",
      urls: "",
      fileList: [],
    };
  },
  methods: {
    Store() {
      info().then((res) => {
        var arr = [];
        var data = res.data.data;
        this.value1 = data.date;
        this.value2 = data.name;
        this.value3 = data.bulletin;
        this.value4 = data.deliveryPrice;
        this.value5 = data.deliveryTime;
        this.value6 = data.description;
        this.value7 = data.score;
        this.value8 = data.sellCount;
        this.id = data.id;
        this.urls = data.avatar;
        this.imgruls = data.pics;
        this.url = "http://127.0.0.1:5000/upload/shop/" + data.avatar;
        this.supports = data.supports;
        for (var item of data.pics) {
          item = "http://127.0.0.1:5000/upload/shop/" + item;
          arr.push(item);
        }
        this.pics = arr;
        this.fileList = this.pics.map((imgstr) => {
          return {
            url: imgstr,
          };
        });
      });
    },
    handleAvatarSuccess(imgurl) {
      this.imgruls.push(imgurl.imgUrl);
    },
    handleAvatarSuccesss(res) {
      this.url = "http://127.0.0.1:5000/upload/shop/" + res.imgUrl;
      this.urls = res.imgUrl;
    },
    handleRemove(res) {
      res.url = res.url.replace("http://127.0.0.1:5000/upload/shop/", "");
      this.imgruls.splice(this.imgruls.indexOf(res.url), 1);
    },
    timechange(str) {
      var ctime = moment(str).format("YYYY-MM-DD HH:mm:ss");
      return ctime;
    },
    sure_btn() {
      var time = [];
      var supports = [];
      var imgruls = [];
      for (var item of this.value1) {
        time.push(moment(item).format("YYYY-MM-DD HH:mm:ss"));
      }
      time = JSON.stringify(time);
      supports = JSON.stringify(this.supports);
      imgruls = JSON.stringify(this.imgruls);
      shopedit(
        this.id,
        this.value2,
        this.value3,
        this.urls,
        this.value4,
        this.value5,
        this.value6,
        this.value7,
        this.value8,
        supports,
        time,
        imgruls
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success",
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  created() {
    this.Store();
  },
};
</script>

<style lang="less" scoped>
#box {
  background-color: #fff;
  padding: 10px;
}
#title {
  padding-bottom: 10px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.el-input {
  width: 300px;
}
.el-textarea {
  width: 500px;
}
span {
  display: block;
  width: 60px;
  text-align: right;
  margin-right: 20px;
  line-height: 38px;
}
p {
  display: flex;
  font-size: 14px;
  padding: 10px 20px;
  line-height: 40px;
}
img {
  padding: 0 6px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
#img_p {
  margin-left: 90px;
}
.el-checkbox {
  line-height: 40px;
}
img {
  width: 146px;
  height: 146px;
}
</style>