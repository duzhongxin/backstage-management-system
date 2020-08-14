<template>
  <div id="box">
    <div id="input_div">
      <span>
        订单号
        <el-input v-model="value1" placeholder="订单号" clearable></el-input>
      </span>
      <span>
        收货人
        <el-input v-model="value2" placeholder="收货人" clearable></el-input>
      </span>
      <span>
        手机号
        <el-input v-model="value3" placeholder="手机号" clearable></el-input>
      </span>
      <span>
        订单状态
        <el-select v-model="value4" placeholder="订单状态" clearable>
          <el-option
            v-for="item in options"
            :key="item.value4"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </span>
    </div>
    <div class="block">
      <span class="demonstration">选择时间</span>
      <el-date-picker
        v-model="value5"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" @click="handleClick">查询</el-button>
    </div>
    <div id="list_div">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="346px"
        v-loading="loading"
        element-loading-text="拼命加载中"
      >
        <el-table-column fixed prop="orderNo" label="订单号" width="100"></el-table-column>
        <el-table-column label="下单时间" width="160">
          <template slot-scope="scope">{{ timechange(scope.row.orderTime) }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="118"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="100"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="100"></el-table-column>
        <el-table-column label="送达时间" width="160">
          <template slot-scope="scope">{{ timechange(scope.row.deliveryTime) }}</template>
        </el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="100"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="100"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="change_btn(scope.row.id)">查看</el-button>
            <el-button type="text" size="small" @click="chnagemsg_btn(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <el-dialog title="订单详情" :visible.sync="centerDialogVisible" width="30%" center>
      <p>
        <b>订单号</b>
        : {{msg.orderNo}}
      </p>
      <p>
        <b>创建时间</b>
        : {{timechange(msg.orderTime)}}
      </p>
      <p>
        <b>手机号</b>
        : {{msg.phone}}
      </p>
      <p>
        <b>收货人</b>
        : {{msg.consignee}}
      </p>
      <p>
        <b>配送地址</b>
        : {{msg.deliverAddress}}
      </p>
      <p>
        <b>送达时间</b>
        : {{timechange(msg.deliveryTime)}}
      </p>
      <p>
        <b>用户备注</b>
        : {{msg.remarks}}
      </p>
      <p>
        <b>订单金额</b>
        : {{msg.orderAmount}}
      </p>
      <p>
        <b>订单状态</b>
        : {{msg.orderState}}
      </p>
    </el-dialog>
    <el-dialog title="修改订单" :visible.sync="centerDialogVisibles" width="30%" center>
      <p>
        <b>订单号：</b>
        <el-input v-model="msg.orderNo" />
      </p>
      <p>
        <b>下单时间：</b>
        <el-input v-model="orderTime" />
      </p>
      <p>
        <b>电话：</b>
        <el-input v-model="msg.phone" />
      </p>
      <p>
        <b>收货人：</b>
        <el-input v-model="msg.consignee" />
      </p>
      <p>
        <b>送货地址：</b>
        <el-input v-model="msg.deliverAddress" />
      </p>
      <p>
        <b>送达时间：</b>
        <el-input v-model="deliveryTime" />
      </p>
      <p>
        <b>备注：</b>
        <el-input v-model="msg.remarks" />
      </p>
      <p>
        <b>订单金额：</b>
        <el-input v-model="msg.orderAmount" />
      </p>
      <p>
        <b>订单状态：</b>
        <el-input v-model="msg.orderState" />
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibles = false">取 消</el-button>
        <el-button type="primary" @click="suremsg_btn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { orderlist } from "@/api/apis";
import { detail } from "@/api/apis";
import { orderedit } from "@/api/apis";
import { search } from "@/api/apis";

var moment = require("moment");
export default {
  data() {
    return {
      currentPage: 1,
      centerDialogVisible: false,
      centerDialogVisibles: false,
      pageSize: 5,
      total: 0,
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      msg: "",
      id: "",
      deliveryTime: "",
      orderTime: "",
      loading: true,
      options: [
        {
          value4: "选项1",
          label: "已完成",
        },
        {
          value4: "选项2",
          label: "已受理",
        },
        {
          value4: "选项3",
          label: "派送中",
        },
      ],
      tableData: [],
    };
  },
  methods: {
    Indent() {
      this.loading = true;
      orderlist(
        this.currentPage,
        this.pageSize,
        this.value1,
        this.value2,
        this.value3,
        this.value4
      ).then((res) => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.loading = false;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.Indent();
    },
    timechange(str) {
      var ctime = moment(str).format("YYYY-MM-DD HH:mm:ss");
      return ctime;
    },
    change_btn(num) {
      this.centerDialogVisible = true;
      detail(num).then((res) => {
        this.msg = res.data.data;
      });
    },
    chnagemsg_btn(num) {
      this.centerDialogVisibles = true;
      this.id = num;
      detail(num).then((res) => {
        this.msg = res.data.data;
        this.orderTime = this.timechange(res.data.data.orderTime);
        this.deliveryTime = this.timechange(res.data.data.deliveryTime);
      });
    },
    suremsg_btn() {
      this.centerDialogVisibles = false;

      var msg = this.msg;
      orderedit(
        this.id,
        msg.orderNo,
        this.orderTime,
        msg.phone,
        msg.consignee,
        msg.deliverAddress,
        this.deliveryTime,
        msg.remarks,
        msg.orderAmount,
        msg.orderState
      ).then((res) => {
        if (res.data.code == 0) {
          if (res.data.code == 0) {
            this.Indent();
            this.$message({
              message: res.data.msg,
              type: "success",
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
            });
          }
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.Indent();
    },
    handleClick() {
      var value5 = [];
      for (var item of this.value5) {
        value5.push(moment(item).format("YYYY-MM-DD HH:mm:ss"));
      }
      value5 = JSON.stringify(value5);
      search(
        this.currentPage,
        this.pageSize,
        this.value1,
        this.value2,
        this.value3,
        this.value4,
        value5
      ).then((res) => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
  },
  created() {
    this.Indent();
  },
};
</script>

<style lang="less" scoped>
#box {
  height: 614px;
  background-color: #fff;
  padding: 20px;
}
#input_div {
  display: flex;
  justify-content: space-around;
  span {
    font-size: 14px;
    .el-input {
      margin-left: 10px;
      width: 200px;
    }
    .el-select {
      width: 200px;
      margin-left: 10px;
    }
  }
}
.block {
  font-size: 14px;
  margin-left: 15px;
  margin-top: 30px;
  .el-range-editor {
    margin: 0 20px;
  }
}
#list_div {
  margin-top: 20px;
}
.block_div {
  .el-pagination {
    margin-top: 30px;
  }
}
.el-dialog {
  p {
    line-height: 40px;
    b {
      display: inline-block;
      width: 70px;
      text-align: right;
    }
  }
  .el-input {
    width: 200px;
    margin-left: 20px;
    margin-bottom: 10px;
  }
}
</style>