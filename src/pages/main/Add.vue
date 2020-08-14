<template>
  <div id="box">
    <div id="title">
      <h4>商品添加</h4>
    </div>
    <div id="content">
      <p>
        商品名称
        <el-input placeholder="请输入内容" v-model="name"></el-input>
      </p>
      <p>
        商品分类
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.cateName"
            :label="item.cateName"
            :value="item.cateName"
          ></el-option>
        </el-select>
      </p>
      <p>
        商品价格
        <el-input-number v-model="num" :min="0" :max="100" label="描述文字"></el-input-number>
      </p>
      <p>
        商品图片
        <span>
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrls" :src="imageUrls" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </span>
      </p>
      <p>
        商品描述
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="goodsDesc"></el-input>
      </p>
    </div>
    <el-button type="primary" @click="add_btn">添加商品</el-button>
  </div>
</template>

<script>
import { categories } from "@/api/apis";
import { goodsadd } from "@/api/apis";

export default {
  data() {
    return {
      imageUrl: "",
      imageUrls: "",
      dialogVisible: false,
      num: 0,
      options: [],
      value: "",
      imgurl: "",
      name: "",
      goodsDesc: "",
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      this.imageUrls =
        "http://127.0.0.1:5000/upload/imgs/goods_img/" + res.imgUrl;
      this.imageUrl = res.imgUrl;
    },
    add_btn() {
      goodsadd(
        this.name,
        this.value,
        this.num,
        this.imageUrl,
        this.goodsDesc
      ).then((res) => {
        if (res.data.code == 0) {
          this.$router.push("/Main/List");
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
    categories().then((res) => {
      this.options = res.data.categories;
    });
  },
};
</script>

<style lang="less" scoped>
#box {
  background-color: #fff;
  padding: 20px;
}
#title {
  padding: 10px;
  padding-bottom: 10px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
#content {
  padding: 20px;
  p {
    .el-input {
      width: 300px;
      margin-left: 20px;
    }
    display: flex;

    padding: 10px;
    line-height: 40px;
    span {
      margin-left: 20px;
    }
  }
}
.el-input-number {
  margin-left: 20px;
}
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader {
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
.avatar-uploader:hover {
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
.el-textarea {
  width: 500px;
  margin-left: 20px;
}
.el-select {
  margin-left: 20px;
}
.el-button {
  margin-left: 110px;
}
</style>