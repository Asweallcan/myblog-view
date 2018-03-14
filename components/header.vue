<template>
  <header class="header">
    <h1 class="hidden">吕世豪的主页</h1>
    <ul class="links">
      <li class="link">
        <el-popover placement="bottom" title="欢迎来到我的网站" width="200" trigger="hover" content="github.com/Asweallcan">
          <img slot="reference" class="avatar" :src="this.apiRoot+'/avatar.jpg'" alt="吕世豪的头像">
        </el-popover>
      </li>
      <li v-for="(item,index) in links" :key="index" class="link" :class="{active:active(index)}">
        <nuxt-link :to="item.path">
          {{item.name}}
        </nuxt-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: "主页",
          path: "/"
        },
        {
          name: "博客",
          path: "/blog"
        },
        {
          name: "电影",
          path: "/movie"
        }
      ]
    };
  },
  methods: {
    active(index) {
      if (this.$route.path === this.links[index].path) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  min-width: 1100px;
  padding: 0 200px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.7) 20%,
    rgba(255, 255, 255, 0.7) 80%,
    rgba(255, 255, 255, 0) 100%
  );
  box-shadow: 10px 0 30px 0 #000;
  font-size: 16px;
  position: absolute;
  z-index: 100;
  .links {
    height: 50px;
    &::after {
      //清除浮动
      content: " ";
      height: 0;
      line-height: 0;
      display: block;
      visibility: hidden;
      clear: both;
    }
    .link {
      float: left;
      line-height: 50px;
      height: 50px;
      text-align: center;
      transition: all 0.3s;
      .avatar {
        width: auto;
        height: 40px;
        margin-top: 5px;
        border-radius: 50%;
        cursor: pointer;
      }
      &:not(:first-child):hover {
        background: rgba(255, 255, 255, 1);
      }
      &:first-child {
        margin-right: 10px;
      }
      a {
        display: inline-block;
        width: 80px;
        text-decoration: none;
      }
    }
    .active {
      background: rgba(255, 255, 255, 1);
    }
  }
}

@media screen and (max-width: 640px) {
  .header {
    min-width: 0;
    max-width: 640px;
    width: 100%;
    padding: 0;
    font-size: 14px;
    .links {
      width: 250px;
      margin: 0 auto;
      height: 40px;
      .link {
        line-height: 40px;
        height: 40px;
        .avatar {
          display: none;
        }
      }
    }
  }
}
</style>
