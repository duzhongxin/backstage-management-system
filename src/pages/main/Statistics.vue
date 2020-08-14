<template>
  <div>
    时间范围
    <el-date-picker
      v-model="date"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>
    <el-button type="primary" @click="clickSearch">查询</el-button>

    <div id="salecount" style="width: 100%; height: 500px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { ordertotal } from "@/api/apis";
var moment = require("moment");

export default {
  data() {
    return {
      date: [], //当前选择的时间
    };
  },
  methods: {
    clickSearch() {
      let timestr = JSON.stringify([
        moment(this.date[0]),
        moment(this.date[1]),
      ]);
      this.refreshEcharts(timestr);
    },
    refreshEcharts(str) {
      ordertotal(str).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.orderTime = moment(obj.orderTime).format("YYYY-MM-DD HH:mm:ss");
        }
        let option = {
          xAxis: {
            type: "category",
            data: arr.map((obj) => obj.orderTime),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: arr.map((obj) => obj.orderAmount),
              type: "bar",
            },
          ],
        };

        this.sechart.setOption(option);
      });
    },
  },
  mounted() {
    this.sechart = echarts.init(document.getElementById("salecount"));
  },
};
</script>

<style lang="less" scoped>
.el-date-editor {
  margin: 0 20px;
}
</style>