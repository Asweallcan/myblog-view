/*
 * @Author: lvshihao 
 * @Date: 2018-01-30 08:45:28 
 * @Last Modified by: lvshihao
 * @Last Modified time: 2018-02-02 10:27:40
 */
<template>
  <div class="container">
    <div class="wrapper">
      <div v-loading="isLoading" class="m-panel">
        <el-container class="form-wrapper">
          <el-header class="form-header">博客后台登陆</el-header>
          <el-main class="form-body">
            <el-form :model="form" status-icon ref="form" class="form">
              <el-form-item prop="username">
                <el-input placeholder="请输入用户名" v-model="form.username" type="text" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="请输入密码" v-model="form.password" type="password" />
              </el-form-item>
              <el-form-item prop="inviteCode" v-show="isRegisting">
                <el-input placeholder="请输入邀请码" v-model="form.inviteCode" type="text"/>
              </el-form-item>
            </el-form>
          </el-main>
          <el-footer class="form-footer">
            <el-button type="primary" @click="regist">注册</el-button>
            <el-button v-if="!isRegisting" type="default" @click="submitForm">登陆</el-button>
            <el-button type="warning" v-else @click="()=>this.isRegisting=!this.isRegisting">取消注册</el-button>
          </el-footer>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  head() {
    return {
      title: "博客后台登陆"
    };
  },
  data() {
    return {
      isLoading: false,
      isRegisting: false,
      form: {
        username: "",
        password: "",
        inviteCode: ""
      }
    };
  },
  layout:"default",
  methods: {
    async submitForm() {
      this.isLoading = true;
      if (!this.form.username || !this.form.password) {
        this.isLoading = false;
        this.showMessage("error", "用户名和密码不能为空");
        return false;
      }
      const { data } = await axios.post(
        this.apiRoot + "/api/admin/login",
        this.form
      );
      this.handleResponse("login", data);
      this.isLoading = false;
      this.$refs.form.resetFields();
    },
    async regist() {
      if (!this.isRegisting) {
        return (this.isRegisting = true);
      }
      this.isLoading = true;
      if (!this.form.username || !this.form.password || !this.form.inviteCode) {
        this.isLoading = false;
        this.showMessage("error", "不能为空");
        return false;
      }
      const { data } = await axios.post(
        this.apiRoot + "/api/admin/regist",
        this.form
      );
      this.handleResponse("regist", data);
    },
    async handleResponse(type, response) {
      if (type === "login") {
        if (typeof response === "number") {
          switch (response) {
            case -1:
              this.isLoading = false;
              this.showMessage("error", "账号不存在");
              break;
            case -2:
              this.isLoading = false;
              this.showMessage("error", "密码错误");
              break;
            default:
              this.isLoading = false;
              this.showMessage("error", "服务器错误");
              break;
          }
        } else if (typeof response === "object") {
          await this.$store.dispatch("login", response);
          this.showMessage("success", "登陆成功");
          this.$refs.form.resetFields();
          this.$router.push("/admin");
        }
      } else {
        switch (response) {
          case -1:
            this.isLoading = false;
            this.showMessage("error", "邀请码错误");
            break;
          case -2:
            this.isLoading = false;
            this.showMessage("error", "用户已存在");
            break;
          case 1:
            this.isLoading = false;
            this.showMessage("success", "注册成功");
            this.$refs.form.resetFields();
            setTimeout(() => {
              this.isRegisting = false;
            }, 1000);
            break;
          default:
            this.isLoading = false;
            this.showMessage("error", "服务器错误");
            break;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  .wrapper {
    .m-panel {
      margin-top: 180px;
      .form-wrapper {
        width: 320px;
        text-align: center;
        .form-header {
          border-bottom: 1px solid #a9a9a9;
          line-height: 60px;
        }
      }
    }
  }
}
</style>
