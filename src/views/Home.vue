<template>
  <div style="height:100%">
    <el-container>
      <el-header class="header">
        <div @click="foldChange">
          <i
            class="home-logo"
            :class="{
              'el-icon-s-fold': iscollapse,
              'el-icon-s-unfold': !iscollapse,
            }"
          ></i>
        </div>
        <img class="m1" src="../assets/img/layout_logo.png" alt="" />
        <div class="title">黑马面面</div>
        <div class="user">
          <img class="avator" src="" alt="" />
          <div class="user-name">{{ '' + ', 你好' }}</div>
        </div>
        <el-button type="primary" icon="el-icon-refresh">退出</el-button>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            :collapse="iscollapse"
            router
          >
            <template
              v-for="(item, index) in $router.options.routes[2].children"
            >
              <el-menu-item :index="item.path" :key="item + index">
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('-------------', this.$router);
  },
  data() {
    return {
      iscollapse: false,
      isActive: '',
    };
  },
  methods: {
    foldChange() {
      this.iscollapse = !this.iscollapse;
    },
  },
  computed: {},
};
</script>

<style lang="less">
.header {
  display: flex;
  align-items: center;
  background-color: #fff;
  .home-logo {
    width: 40px;
    height: 40px;
    font-size: 40px;
  }
  .m1 {
    margin-left: 28px;
  }
  .title {
    margin-left: 12px;
    flex: 1;
    font-size: 22px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: bold;
    text-align: left;
    color: #49a1ff;
    letter-spacing: 1px;
  }
  .user {
    display: flex;
    align-items: center;
    height: 43px;
    .avator {
      width: 43px;
      height: 43px;
      object-fit: cover;
    }
    .user-name {
      margin: 0 38px 0 10px;
      font-size: 14px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: bold;
      text-align: left;
      color: #636363;
      letter-spacing: 0px;
    }
  }
}
.el-aside {
  width: auto !important;
}
.el-container {
  height: 100%;
}
.el-menu {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 400px;
}
.el-menu-item span {
  font-weight: 700;
}
.el-main {
  background-color: #e8e9ec;
  padding: 20px;
}
</style>
