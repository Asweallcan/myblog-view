/*
 * @Author: lvshihao 
 * @Date: 2018-01-30 08:45:36 
 * @Last Modified by: lvshihao
 * @Last Modified time: 2018-02-02 12:14:01
 */
<template>
  <div class="header">
      <ul class="links">
          <li class="link" v-for="(link,index) in links" :key="index" :class="{active:active(index)}">
              <nuxt-link :to="link.path">
                  {{link.name}}
              </nuxt-link>
          </li>
          <li @click="logout" class="link">
            <a>
              退出登陆
            </a>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { name: "返回首页", path: "/" },
        { name: "概况", path: "/admin" },
        { name: "管理电影", path: "/admin/movie" },
        { name: "管理文章", path: "/admin/article" }
      ]
    };
  },
  methods: {
    active(index) {
      if (
        this.$route.path === this.links[index].path ||
        this.$route.path === this.links[index].path + "/"
      ) {
        return true;
      }
      return false;
    },
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/admin/login");
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 640px) {
  
}
.header {
  width: 150px;
  height: 100%;
  font-size: 18px;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  .links {
    .link {
      text-shadow: 1px 1px 3px #000;
      a {
        display: inline-block;
        width: 100%;
        height: 70px;
        line-height: 70px;
        transition: all 0.3s;
        color: #fff;
        cursor: pointer;
        &:hover {
          text-decoration: none;
          background: rgba(255, 255, 255, 0.7);
          color: #000;
          text-shadow: 1px 1px 10px #fff;
        }
      }
    }
    .active {
      background: rgba(255, 255, 255, 0.7);
      a {
        color: #000;
        text-shadow: 1px 1px 10px #fff;
        box-shadow: 0 10px 30px 0 #000;
      }
    }
  }
}
</style>

