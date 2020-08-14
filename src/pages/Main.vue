<template>
  <el-container>
    <el-aside>
      <el-row class="tac">
        <el-col :span="12">
          <el-menu
            :default-active="path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            router
          >
            <div>
              <el-menu-item>
                <i class="el-icon-platform-eleme"></i>
                <span>外卖后台管理系统</span>
              </el-menu-item>
            </div>
            <div v-for="(item,index) in powerarr" :key="index">
              <el-menu-item :index="item.url" v-if="!item.children">
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
              <el-submenu :index="item.url" v-else>
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </template>
                <el-menu-item-group v-for="(items,indexs) in item.children" :key="indexs">
                  <el-menu-item :index="items.url">{{items.name}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </div>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item,index) in headerlist" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
          <span @click="change">{{uname}}</span>
          <img :src="headimg" class="headerimg" />
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { checktoken } from "@/api/apis";
import { accountinfo } from "@/api/apis";
var moment = require("moment");
export default {
  data() {
    return {
      headerlist: [],
      uname: "",
      path: "",
      headimg: "",
      list: [
        {
          url: "/Main/",
          icon: "el-icon-s-home",
          name: "后台首页",
          perons: ["super", "normal"],
        },
        {
          url: "/Main/Indent",
          icon: "el-icon-document",
          name: "订单管理",
          perons: ["super", "normal"],
        },
        {
          url: "3",
          icon: "el-icon-shopping-bag-2",
          name: "商品管理",
          children: [
            { url: "/Main/List", name: "商品列表" },
            { url: "/Main/Add", name: "商品添加" },
            { url: "/Main/Commodity", name: "商品分类" },
          ],
          perons: ["super", "normal"],
        },
        {
          url: "/Main/Store",
          icon: "el-icon-s-shop",
          name: "店铺管理",
          perons: ["super"],
        },
        {
          url: "5",
          icon: "el-icon-user-solid",
          name: "账号管理",
          children: [
            { url: "/Main/AccountList", name: "账号列表" },
            { url: "/Main/AddAccount", name: "添加账号" },
            { url: "/Main/ChangePwd", name: "修改密码" },
            { url: "/Main/Message", name: "账号信息" },
          ],
          perons: ["super"],
        },
        {
          url: "6",
          icon: "el-icon-time",
          name: "销售统计",
          children: [
            { url: "/Main/ShopStatistics", name: "商品统计" },
            { url: "/Main/Statistics", name: "订单统计" },
          ],
          perons: ["super"],
        },
      ],
    };
  },
  created() {
    this.path = this.$route.path;
    accountinfo(localStorage.id).then((res) => {
      this.headimg = res.data.accountInfo.imgUrl;
    });
    checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        this.uname = localStorage.uname;
      } else {
        this.uname = "请登录！";
      }
    });
    this.$bus.$on("infoimg", () => {
      accountinfo(localStorage.id).then((res) => {
        this.headimg = res.data.accountInfo.imgUrl;
      });
    });
    this.headerlist = this.$route.meta.headerlist;
  },
  methods: {
    change() {
      if ((this.uname = localStorage.uname)) {
        this.$router.push("/Main/ChangePwd");
      }
    },
    timechange(str) {
      var ctime = moment(str).format("YYYY-MM-DD");
      return ctime;
    },
  },
  computed: {
    powerarr() {
      return this.list.filter((item) =>
        item.perons.includes(localStorage.role)
      );
    },
  },
  watch: {
    $route(to) {
      this.headerlist = to.meta.headerlist;
      this.path = this.$route.path;
    },
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #545c64;
}
.el-menu {
  border-right: 0;
  width: 300px;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-main {
  background-color: #f0f2f5;
}
.headerimg {
  width: 50px;
  border-radius: 50%;
  vertical-align: middle;
  margin-left: 20px;
}
</style>