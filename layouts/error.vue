<template>
  <div class="container">
    <div class="wrapper">
      <div class="box">
        <p>
          <i class="el-icon-search"></i>
        </p>
        {{error.statusCode === 403? error.message :  "出错了"}}
        <p class="icon" v-show="error.statusCode===403">
          <i class="el-icon-sort-up"></i>
          <i class="el-icon-sort-down"></i>
        </p>
        <p class="to-login" v-show="error.statusCode===403">
          <nuxt-link to="/admin/login" >返回登陆</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import VueHeader from "~/components/header.vue";
export default {
  head() {
    return {
      title: "ERROR"
    };
  },
  scrollToTop: true,
  props: ["error"],
  data() {
    return {
      background: this.$store.state.background
    };
  },
  components: {
    VueHeader
  }
};
</script>


<style scoped>
.wrapper .box {
  text-align: center;
  padding: 30px 100px;
  margin-top: 180px;
  font-size: 35px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #000;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 10px 30px 0 #000;
}

.wrapper .box i {
  font-size: 80px;
}

.wrapper .box .to-login {
  font-size: 20px;
}
.wrapper .box .to-login a {
  color: rgb(112, 154, 245);
}

.wrapper .box .icon i {
  font-size: 30px;
}
</style>
