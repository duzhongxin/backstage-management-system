<template>
  <div id="box">
    <div id="title">
      <h4>账号列表</h4>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      height="334px"
      v-loading="loading"
      element-loading-text="拼命加载中"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="userGroup" label="用户组"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ timechange(scope.row.ctime) }}</template>
      </el-table-column>
      <el-table-column label="操作" prop="id">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="changlisbtn(scope.row.id,scope.row.account,scope.row.userGroup)"
          >编辑</el-button>
          <el-button type="danger" size="small" @click="delbtn(scope.row.id)">删除</el-button>
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
    <el-button type="danger" @click="delsbtn">批量删除</el-button>
    <el-button type="primary">取消选择</el-button>

    <el-dialog title="修改账户信息" :visible.sync="centerDialogVisible" width="30%" center>
      <p>
        <b>账号</b>
        <el-input v-model="value2" />
      </p>
      <p>
        <b>用户组</b>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure_btn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { list } from "@/api/apis";
import { del } from "@/api/apis";
import { batchdel } from "@/api/apis";
import { edit } from "@/api/apis";
var moment = require("moment");

export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      centerDialogVisible: false,
      options: [
        {
          label: "超级管理员",
        },
        {
          label: "普通管理员",
        },
      ],
      value: "",
      id: "",
      value2: "",
      loading: true,
    };
  },
  methods: {
    AccountList() {
      this.loading = true;
      list(this.currentPage, this.pageSize).then((res) => {
        this.loading = false;
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.AccountList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.AccountList();
    },
    sure_btn() {
      this.centerDialogVisible = false;
      edit(this.id, this.value2, this.value).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success",
          });
          this.AccountList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    timechange(str) {
      var ctime = moment(str).format("YYYY-MM-DD HH:mm:ss");
      return ctime;
    },
    delbtn(num) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          del(num).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: "success",
              });
              this.AccountList();
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
    changlisbtn(num, uname, userGroup) {
      (this.id = num),
        (this.value2 = uname),
        (this.centerDialogVisible = true),
        (this.value = userGroup);
    },
    delsbtn() {
      var ids = [];
      for (var item of this.multipleSelection) {
        ids.push(item.id);
      }
      ids = JSON.stringify(ids);
      batchdel(ids).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success",
          });
          this.AccountList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  created() {
    this.AccountList();
  },
};
</script>

<style lang="less" scoped>
#box {
  background-color: #fff;
  padding: 20px;
}
#title {
  padding-bottom: 10px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.block_div {
  padding: 20px 0;
}
.el-dialog {
  .el-input {
    width: 200px;
  }
  p {
    line-height: 80px;
  }
  b {
    display: inline-block;
    width: 80px;
    text-align: right;
    margin-right: 20px;
  }
}
</style>