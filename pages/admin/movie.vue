<template>
  <div v-loading.fullscreen.lock="isLoading" class="container">
    <div class="wrapper">
      <div class="m-panel">
        <div class="head">
          <el-carousel :autoplay="false" @change="change" indicator-position="none" type="card" height="230px">
            <el-carousel-item v-for="(item,index) in movies" :key="index" :style="background(index)"/>
          </el-carousel>
        </div>
        <div class="body">
          <div class="left">
            <h3>海报上传</h3>
            <div class="large-img">
              <img :src="apiRoot+image" alt="海报">
            </div>
            <hr>
            <el-upload :before-upload="beforeUpload" :on-success="afterUpload" :limit="1" class="upload" :action="apiRoot+'/api/movie/uploadimage'"
              list-type="picture" :data="{id:form.id}">
              <el-button type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
          <div class="right">
            <div class="main">
              <el-form :model="form" ref="form">
                <el-form-item label="名称" prop="title">
                  <el-input v-model="form.title" />
                </el-form-item>
                <el-form-item label="主演" prop="stars">
                  <el-input v-model="form.stars" placeholder="人名之间请用/分隔" />
                </el-form-item>
                <el-form-item label="导演" prop="director">
                  <el-input v-model="form.director" />
                </el-form-item>
                <el-form-item label="评分" prop="rate">
                  <el-rate allow-half style="line-height:40px;height:40px;" :max="10" v-model="form.rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                  />
                </el-form-item>
                <el-form-item label="描述" prop="description">
                  <el-input type="textarea" :rows="6" v-model="form.description" />
                </el-form-item>
              </el-form>
            </div>
            <div class="footer">
              <el-button type="primary" @click="submit">确认提交</el-button>
              <el-button type="info" @click="resetFields">新建电影</el-button>
              <el-button type="danger" @click="Delete">删除电影</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  layout: "admin",
  middleware: ["auth"],
  head() {
    return {
      title: "管理电影"
    };
  },
  async asyncData({ apiRoot }) {
    const { data } = await axios.post(apiRoot + "/api/movie/getmovies", {
      conditions: {}
    });
    return {
      movies: data
    };
  },
  transition(to, from) {
    if (!from) return "slide-down";
    return to.path.length < from.path.length ? "slide-up" : "slide-down";
  },
  data() {
    return {
      form: {
        title: "",
        stars: "",
        director: "",
        rate: 0,
        description: "",
        id: ""
      },
      isLoading: false,
      image: "",
      currentIndex: 0
    };
  },
  methods: {
    beforeUpload() {
      if (!this.form.id) {
        this.showMessage("error", "请先提交电影再上传图片");
        return false;
      }
    },
    afterUpload(response) {
      this.$router.go(0);
    },
    async submit() {
      this.isLoading = true;
      const { data } = await axios.post(
        this.apiRoot + "/api/movie/create",
        this.form
      );
      this.isLoading = false;
      if (data === -1) {
        this.showMessage("error", "提交失败");
        return false;
      }
      if (data === 1) {
        this.showMessage("success", "提交成功");
        return true;
      }
      this.showMessage("success", "提交成功");
      this.form.id = data;
    },
    async Delete() {
      try {
        if (!this.form.id) {
          return this.showMessage("error", "请先选择电影");
        }
        this.showConfirm(`确定删除${this.form.title}这部电影吗？`).then(
          async () => {
            this.isLoading = true;
            await axios.post(this.apiRoot + "/api/movie/delete", {
              id: this.form.id
            });
            this.isLoading = false;
            this.showMessage("success", "删除成功");
            setTimeout(() => {
              this.$router.go(0);
            }, 1000);
          }
        );
      } catch (err) {
        this.isLoading = false;
        this.showMessage("error", "删除失败");
      }
    },
    background(index) {
      return `background:url('${this.apiRoot}/movies/${
        this.movies[index]._id
      }/${
        this.movies[index].imageName
      }') no-repeat center center;background-size:cover;`;
    },
    change(index) {
      this.currentIndex = index;
      this.form.title = this.movies[index].title;
      this.form.stars = this.movies[index].stars.join("/");
      this.form.director = this.movies[index].director;
      this.form.rate = this.movies[index].rate;
      this.form.description = this.movies[index].description;
      this.form.id = this.movies[index]._id;
      this.image = `/movies/${this.form.id}/${this.movies[index].imageName}`;
    },
    resetFields() {
      this.form = {
        title: "",
        stars: "",
        director: "",
        rate: 0,
        description: "",
        id: ""
      };
      this.image = "";
    }
  }
};
</script>

<style lang="scss" scoped>

.container {
  width: 100%;
  padding-left: 150px;
  .wrapper {
    padding-top: 30px;
    display: block;
    .m-panel {
      display: block;
      margin: 0 auto;
      width: 1100px;
      .body {
        display: flex;
        justify-content: center;
        .left {
          width: 300px;
          margin-right: 30px;
          .large-img {
            img {
              max-width: 300px;
              display: inline-block;
            }
          }
        }
        .right {
          width: 600px;
          .main {
            .line {
              margin-bottom: 10px;
              label {
                display: block;
                margin-bottom: 10px;
              }
            }
            margin-bottom: 30px;
          }
          .footer {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
