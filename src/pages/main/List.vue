<template>
  <div id="box">
    <div id="title">
      <h4>商品列表</h4>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="500px"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <img :src="props.row.imgUrl" />
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="店铺价格">
              <span>{{ props.row.price}}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ timechange(props.row.ctime) }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="props">
          <img :src="props.row.imgUrl" width="60px" />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button
            size="small"
            type="primary"
            @click="change_btn(props.row.id,props.row.name,props.row.category,props.row.price,props.row.goodsDesc,props.row.imgUrl)"
          >编辑</el-button>
          <el-button type="danger" size="small" @click="del_btn(props.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block_div">
      <el-pagination
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <el-dialog title="修改商品" :visible.sync="centerDialogVisible" width="30%" center>
      <p>
        <b>商品名称：</b>
        <el-input v-model="name" />
      </p>
      <p>
        <b>商品分类：</b>
        <el-select v-model="value">
          <el-option
            v-for="item in options"
            :key="item.cateName"
            :label="item.cateName"
            :value="item.cateName"
          ></el-option>
        </el-select>
      </p>
      <p>
        <b>商品价格：</b>
        <el-input-number v-model="num" :min="0" :max="100"></el-input-number>
      </p>
      <p>
        <b>商品图片:</b>
        <span>
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imgurls" :src="imgurls" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </span>
      </p>
      <p>
        <b>商品描述：</b>
        <el-input type="textarea" :rows="2" v-model="goodsDesc"></el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure_btn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { goodslist } from "@/api/apis";
import { goodsdel } from "@/api/apis";
import { categories } from "@/api/apis";
import { goodsedit } from "@/api/apis";

var moment = require("moment");
export default {
  data() {
    return {
      success: true,
      dialogImageUrl: "",
      dialogVisible: false,
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      centerDialogVisible: false,
      num: 0,
      goodsDesc: "",
      options: [],
      value: "",
      imgurl: "",
      name: "",
      id: 0,
      imgurls: "",
      loading: true,
    };
  },
  methods: {
    List() {
      this.loading = true;
      goodslist(this.currentPage, this.pageSize).then((res) => {
        this.loading = false;
        this.tableData = res.data.data;
        this.total = res.data.total;
        for (var item of this.tableData) {
          item.imgUrl =
            "http://127.0.0.1:5000/upload/imgs/goods_img/" + item.imgUrl;
        }
      });
    },
    handleAvatarSuccess(res) {
      this.imgurls =
        "http://127.0.0.1:5000/upload/imgs/goods_img/" + res.imgUrl;
      this.imgurl = res.imgUrl;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.List();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.List();
    },
    timechange(str) {
      var ctime = moment(str).format("YYYY-MM-DD");
      return ctime;
    },
    del_btn(num) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          goodsdel(num).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: "success",
              });
              this.List();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    change_btn(num, name, category, price, goodsDesc, imgurl) {
      this.centerDialogVisible = true;
      this.id = num;
      this.name = name;
      this.value = category;
      this.num = price;
      this.goodsDesc = goodsDesc;
      this.imgurls = imgurl;
      this.imgurl = imgurl.replace(
        "http://127.0.0.1:5000/upload/imgs/goods_img/",
        ""
      );
    },
    sure_btn() {
      goodsedit(
        this.name,
        this.value,
        this.num,
        this.imgurl,
        this.goodsDesc,
        this.id
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success",
          });
          this.List();
        } else {
          this.$message.error(res.data.msg);
        }
      });
      this.centerDialogVisible = false;
    },
  },

  created() {
    this.List();
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
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.block_div {
  padding: 20px 0;
}
.el-dialog {
  .el-input {
    width: 300px;
  }
  p {
    line-height: 60px;
  }
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
</style>