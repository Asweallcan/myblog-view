/* * @Author: lvshihao * @Date: 2018-01-30 10:36:58 * @Last Modified by: lvshihao * @Last Modified time: 2018-01-30 13:07:35
*/
<template>
  <div v-loading.fullscreen.lock="isLoading" class="container">
    <div class="wrapper">
      <div class="m-panel">
        <div class="box info">
          <el-container class="info-form">
            <el-header class="info-form-header">
              个人信息
            </el-header>
            <el-main class="info-form-body">
              <el-form :model="form" status-icon ref="form" class="form">
                <el-form-item prop="username" v-show="!isChangingPassword">
                  <el-input disabled v-model="form.username" type="text">
                    <template slot="prepend">用户名</template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="nickname" v-show="!isChangingPassword">
                  <el-input v-model="form.nickname" type="text">
                    <template slot="prepend">昵称</template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="oldpassword" v-show="isChangingPassword">
                  <el-input v-model="form.oldpassword" type="password">
                    <template slot="prepend">旧密码</template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="newpassword" v-show="isChangingPassword">
                  <el-input v-model="form.newpassword" type="password">
                    <template slot="prepend">新密码</template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="newpassword2" v-show="isChangingPassword">
                  <el-input v-model="form.newpassword2" type="password">
                    <template slot="prepend">确认密码</template>
                  </el-input>
                </el-form-item>
              </el-form>
            </el-main>
            <el-footer class="info-form-footer">
              <el-button type="primary" v-show="!isChangingPassword" @click="changeNickname">修改昵称</el-button>
              <el-button type="default" v-show="!isChangingPassword" @click="()=>isChangingPassword=!isChangingPassword">修改密码</el-button>
              <el-button type="primary" v-show="isChangingPassword" @click="changePassword">确认修改</el-button>
              <el-button type="warning" v-show="isChangingPassword" @click="()=>isChangingPassword=!isChangingPassword">取消修改</el-button>
            </el-footer>
          </el-container>
        </div>
      </div>
      <div class="m-panel">
        <Background height="230px">
          <p slot="title">背景设置</p>
          <el-footer slot="footer" height="auto" class="background-footer">
            <el-upload class="upload-demo" :action="this.apiRoot+'/api/admin/uploadimage'" list-type="picture">
              <el-button type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-footer>
        </Background>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Background from "~/components/background.vue";
export default {
  head() {
    return {
      title: "博客管理后台"
    };
  },
  layout: "admin",
  transition: "slide-up",
  middleware: "auth",
  components: {
    Background
  },
  data() {
    return {
      form: {
        username: this.$store.state.admin.username,
        nickname: this.$store.state.admin.nickname,
        oldpassword: "",
        newpassword: "",
        newpassword2: ""
      },
      isChangingPassword: false,
      isLoading: false
    };
  },
  computed: mapState(["backgrounds"]),
  methods: {
    async changePassword() {
      if (
        !this.form.oldpassword ||
        !this.form.newpassword ||
        !this.form.newpassword2
      ) {
        return this.showMessage("error", "不能为空");
      }
      if (
        this._md5(this.form.oldpassword) !== this.$store.state.admin.password
      ) {
        return this.showMessage("error", "原密码输入错误");
      }
      if (this.form.newpassword !== this.form.newpassword2) {
        return this.showMessage("error", "两次密码输入不一致");
      }
      this.isLoading = true;
      const { data } = await axios.post(this.apiRoot + "/api/admin/update", {
        ...this.$store.state.admin,
        password: this._md5(this.form.newpassword)
      });
      console.log(data);
      this.handleResponse("changePassword", data);
    },
    async changeNickname() {
      if (!this.form.nickname) {
        return this.showMessage("error", "昵称不能为空");
      }
      if (this.form.nickname === this.$store.state.admin.nickname) {
        return this.showMessage("error", "与当前昵称相同");
      }
      this.isLoading = true;
      const { data } = await axios.post(this.apiRoot + "/api/admin/update", {
        ...this.$store.state.admin,
        nickname: this.form.nickname
      });
      this.handleResponse("changeNickname", data);
    },
    handleResponse(type, response) {
      switch (type) {
        case "changeNickname":
          this.updateAdmin(response);
          break;
        case "changePassword":
          this.updateAdmin(response);
          this.isChangingPassword = false;
          break;
        default:
          break;
      }
    },
    async updateAdmin(response) {
      if (response === 1) {
        this.showMessage("success", "修改成功");
        await this.$store.dispatch("update", {
          ...this.$store.state.admin,
          password: this._md5(this.form.newpassword),
          nickname: this.form.nickname
        });
      } else {
        this.showMessage("error", "修改失败");
      }
      return (this.isLoading = false);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding-left: 300px;
  .wrapper {
    padding: 0;
    display: block;
    &::after {
      content: "";
      visibility: hidden;
      height: 0;
      line-height: 0;
      display: block;
      clear: both;
    }
    .m-panel {
      background: transparent;
      box-shadow: none;
      display: block;
      float: left;
      .box {
        background: rgba(255, 255, 255, 0.7);
        text-align: center;
        padding: 10px;
        box-shadow: 0 10px 30px 0 #000;
        width: 800px;
      }
      .info {
        width: 300px;
        display: block;
        .info-form {
          .info-form-header {
            line-height: 60px;
          }
          .info-form-footer {
            line-height: 60px;
          }
        }
      }
      .background-footer {
        text-align: left;
      }
    }
  }
}
</style>
