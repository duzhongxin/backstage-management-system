<template>
  <div id="box">
    <div id="title">
      <h4>商品分类</h4>
      <div>
        <el-button type="primary" @click="centerDialogVisible = true">添加分类</el-button>
        <el-button type="primary" @click="msg">查看所有分类</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="334px"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column prop="cateName" label="分类名称"></el-table-column>
      <el-table-column label="是否启用">
        <el-switch
          slot-scope="props"
          v-model="props.row.state"
          active-color="#13ce66"
          inactive-color="#ff4949"
          disabled
        ></el-switch>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button
            size="small"
            @click="changemsg_btn(props.row.id,props.row.cateName,props.row.state)"
          >编辑</el-button>
          <el-button type="danger" size="small" @click="delbtn(props.row.id)">删除</el-button>
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
    <el-dialog title="添加分类" :visible.sync="centerDialogVisible" width="30%" center>
      <b>
        分类名称：
        <el-input v-model="new_cateName" />
      </b>

      <b>
        是否启用：
        <el-switch v-model="new_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </b>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addmsg_btn">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改分类" :visible.sync="centerDialogVisibles" width="30%" center>
      <b>
        分类名称：
        <el-input v-model="change_cateName" />
      </b>
      <b>
        是否启用：
        <el-switch v-model="change_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </b>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibles = false">取 消</el-button>
        <el-button type="primary" @click="sure_btn">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="所有分类"
      :visible.sync="centerDialogVisibless"
      width="30%"
      center
      class="content"
    >
      <p v-for="(item,index) in shopmsg" :key="index">{{index+1}}.{{item.cateName}}</p>
    </el-dialog>
  </div>
</template>

<script>
import { catelist } from "@/api/apis";
import { delcate } from "@/api/apis";
import { addcate } from "@/api/apis";
import { editcate } from "@/api/apis";
import { categories } from "@/api/apis";

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      centerDialogVisible: false,
      centerDialogVisibles: false,
      value: true,
      new_cateName: "",
      new_state: true,
      change_cateName: "",
      change_state: true,
      id: "",
      centerDialogVisibless: false,
      shopmsg: "",
      arr: [],
      loading: true,
    };
  },
  methods: {
    Commodity() {
      this.loading = true;
      catelist(this.currentPage, this.pageSize).then((res) => {
        this.loading = false;
        let arr = res.data.data;
        for (var item of arr) {
          item.state = item.state == 1 ? true : false;
        }
        this.tableData = arr;
        this.total = res.data.total;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.Commodity();
    },
    addmsg_btn() {
      addcate(this.new_cateName, this.new_state).then((res) => {
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
      this.Commodity();
      this.centerDialogVisible = false;
    },
    changemsg_btn(num, name, state) {
      this.centerDialogVisibles = true;
      this.id = num;
      this.change_cateName = name;
      this.change_state = state == true ? 0 : 1;
    },
    msg() {
      categories().then((res) => {
        this.centerDialogVisibless = true;
        this.shopmsg = res.data.categories;
      });
    },

    sure_btn() {
      editcate(this.id, this.change_cateName, this.change_state).then((res) => {
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
      this.Commodity();
      this.centerDialogVisibles = false;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.Commodity();
    },
    delbtn(num) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delcate(num).then((res) => {
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

      this.Commodity();
    },
  },
  created() {
    this.Commodity();
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
.block_div {
  padding: 20px 0;
}
b {
  line-height: 50px;
}
.content {
  p {
    font-size: 18px;
    line-height: 40px;
    text-align: center;
  }
}
</style>