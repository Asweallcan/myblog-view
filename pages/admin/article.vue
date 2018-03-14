<template>
  <div v-loading.fullscreen.lock="isLoading" class="m-container">
    <div class="wrapper">
      <div class="m-panel">
        <div class="left">
          <div class="top">
            <ul class="list">
              <h3>文章列表</h3>
              <hr>
              <li class="list-item" v-for="(item,index) in articles" :key="index" @click="editArticle(item)">
                {{item.title}}
              </li>
            </ul>
            <pagination :page="page" :totalPages="totalPages"/>
          </div>
          <div class="bottom">
            <ul class="list">
              <h3>草稿箱</h3>
              <hr>
              <li class="list-item" v-for="(item,index) in savedArticles" :key="index" @click="editSavedArticle(item)">
                {{item.title}}
              </li>
            </ul>
          </div>
        </div>
        <div class="right">
          <div class="main">
            <el-form :model="form" ref="form">
              <el-form-item label="标题" prop="title">
                <el-input v-model="form.title" />
              </el-form-item>
              <el-form-item label="标签" prop="stars">
                <el-input placeholder="标签之间请用/分隔" v-model="form.tags" />
              </el-form-item>
              <el-form-item label="摘要" prop="stars">
                <el-input v-model="form.description" />
              </el-form-item>
              <el-form-item label="是否发布" prop="release">
                <el-radio-group v-model="form.release">
                  <el-radio :label="true" />
                  <el-radio :label="false" />
                </el-radio-group>
              </el-form-item>
              <div id="summernote" />
            </el-form>
          </div>
          <div class="footer">
            <el-button :disabled="!form.release" type="primary" @click="submit">确认提交</el-button>
            <el-button type="warning" @click="saveArticle">保存草稿</el-button>
            <el-button type="info" @click="resetFields">新建文章</el-button>
            <el-button :disabled="!form.id || !form.title" type="danger" @click="Delete">删除文章</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Pagination from "~/components/pagination.vue";
import { mapState } from "vuex";
export default {
  middleware: ["auth"],
  layout: "admin",
  head() {
    return {
      title: "管理文章",
      script: [
        {
          src: "https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"
        },
        {
          src: "https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"
        },
        {
          src: "https://cdn.bootcss.com/summernote/0.8.9/summernote.min.js"
        },
        {
          src:
            "https://cdn.bootcss.com/summernote/0.8.9/lang/summernote-zh-CN.min.js"
        }
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css"
        },
        {
          rel: "stylesheet",
          href: "https://cdn.bootcss.com/summernote/0.8.9/summernote.css"
        }
      ]
    };
  },
  async asyncData({ query, apiRoot, store }) {
    const page = query.page || 1;
    const { data } = await axios.post(apiRoot + "/api/article/getarticles", {
      page,
      author: store.state.admin.username,
      type: "admin"
    });
    return {
      page,
      totalPages: data.totalPages,
      articles: data.articles
    };
  },
  transition(to, from) {
    if (!from) return "slide-down";
    return from.path.length < to.path.length ? "slide-down" : "slide-up";
  },
  mounted() {
    this.$nextTick(() => {
      this.initEditor();
      this.getSavedArticles();
    });
  },
  data() {
    return {
      form: {
        title: "",
        tags: "",
        content: "",
        id: "",
        description: "",
        release: false
      },
      image: [],
      isLoading: false,
      savedArticles: []
    };
  },
  computed: mapState(["admin"]),
  components: {
    Pagination
  },
  methods: {
    handleCurrentChange() {},
    async submit() {
      try {
        const savedArticles = JSON.parse(localStorage.savedArticles || "[]");
        savedArticles.forEach((element, index, input) => {
          if (element.title === this.form.title) {
            input.splice(index, 1);
            return false;
          }
        });
        localStorage.savedArticles = JSON.stringify(savedArticles);
        this.savedArticles = savedArticles;

        this.isLoading = true;
        const { data } = await axios.post(this.apiRoot + "/api/article/save", {
          title: this.form.title,
          tags: this.form.tags,
          content: this.form.content,
          description: this.form.description,
          id: this.form.id,
          author: this.admin.username,
          image: this.image
        });
        this.isLoading = false;
        if (data === 1) {
          this.showMessage("success", "提交成功");
          this.$router.go(0);
        } else {
          this.showMessage("error", "提交失败");
        }
      } catch (error) {
        this.isLoading = false;
        this.showMessage("error", error);
      }
    },
    saveArticle() {
      if (!this.form.title) {
        return this.showMessage("error", "请输入题目");
      }
      const savedArticles = JSON.parse(localStorage.savedArticles || "[]");
      savedArticles.forEach((element, index, input) => {
        if (element.title === this.form.title) {
          input.splice(index, 1);
          return false;
        }
      });
      savedArticles.push({
        ...this.form
      });
      localStorage.savedArticles = JSON.stringify(savedArticles);
      this.savedArticles = savedArticles;
    },
    async Delete() {
      if (!this.form.id) {
        this.showConfirm("确定删除这篇草稿吗？").then(() => {
          this.savedArticles.forEach((element, index, input) => {
            if (element.title === this.form.title) {
              input.splice(index, 1);
              return false;
            }
          });
          localStorage.savedArticles = JSON.stringify(savedArticles);
        });
      } else {
        try {
          this.showConfirm("确定删除这篇文章吗？").then(async () => {
            const id = this.form.id;
            this.resetFields();
            await axios.post(this.apiRoot + "/api/article/delete", {
              id: id
            });
            this.articles.forEach((element, index) => {
              if (element._id === id) {
                this.articles.splice(index, 1);
                this.showMessage("success", "删除成功");
                return false;
              }
            });
          });
        } catch (err) {
          this.showMessage("error", err);
        }
      }
    },
    getSavedArticles() {
      const savedArticles = JSON.parse(localStorage.savedArticles || "[]");
      this.savedArticles = savedArticles;
    },
    editArticle(item) {
      this.form = {
        title: item.title,
        tags: item.tags.join("/"),
        content: item.content,
        id: item._id,
        description: item.description,
        release: true
      };
      $("#summernote").summernote("code", item.content);
    },
    editSavedArticle(item) {
      this.form = {
        ...item
      };
      $("#summernote").summernote("code", item.content);
    },
    initEditor() {
      $("#summernote").summernote({
        width: 840,
        height: 500,
        lang: "zh-CN",
        toolbar: [
          [
            "style",
            ["bold", "italic", "underline", "clear", "strikethrough", "style"]
          ],
          ["fontsize", ["fontsize"]],
          ["color", ["color"]],
          ["insert", ["picture", "link", "table", "hr"]],
          ["misc", ["fullscreen", "undo"]]
        ],
        placeHolder: "请输入正文",
        callbacks: {
          onImageUpload: async files => {
            try {
              if (!this.form.title) {
                return this.showMessage("error", "上传图片必须有标题");
              }
              this.isLoading = true;
              let image = new FormData();
              image.append("image", files[0]);
              image.append("title", this.form.title);
              const { data } = await axios.post(
                this.apiRoot + "/api/article/uploadimage",
                image,
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                }
              );
              this.isLoading = false;
              let imageNode = document.createElement("img");
              imageNode.src = data;
              $("#summernote").summernote("insertNode", imageNode);
            } catch (error) {
              this.isLoading = false;
              this.showMessage("error", error);
            }
          },
          onChange: content => {
            this.image = this.matchImage(content);
            this.form.content = content;
          }
        }
      });
    },
    matchImage(content) {
      const production = true;
      const url = ""
      const regexp = production ?  /server\.lvshihaonb\.cn\/articles\/\S+\/(\d+\.\w+)/gi : /http:\/\/localhost:8088\/articles\/\S+\/(\d+\.\w+)/g;
      let image = [],
        temp;
      while ((temp = regexp.exec(content)) != null) {
        image.push(temp[1]);
      }
      return image;
    },
    resetFields() {
      this.form = {
        title: "",
        tags: "",
        content: "",
        id: "",
        description: "",
        release: false
      };
      $("#summernote").summernote("code", "");
    }
  },
  watch: {
    "$route.query.page": async function(page) {
      this.$nuxt.$loading.start();
      const { data } = await axios.post(
        this.apiRoot + "/api/article/getarticles",
        {
          page,
          author: this.admin.username,
          type: "admin"
        }
      );
      this.articles = data.articles;
      this.page = page;
      this.totalPages = data.totalPages;
      this.$nuxt.$loading.finish();
    }
  }
};
</script>

<style lang="scss" scoped>
.m-container {
  width: 100%;
  min-width: 1160px;
  min-height: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  padding-left: 150px;
  .wrapper {
    padding-top: 30px;
    display: block;
    .m-panel {
      background: linear-gradient(
        to left bottom,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.7) 5%,
        rgba(255, 255, 255, 0.7) 95%,
        rgba(255, 255, 255, 0)
      );
      width: 1160px;
      margin: 0 auto;
      box-shadow: 0 10px 30px 0 #000;
      display: flex;
      justify-content: center;
      .list-item {
        cursor: pointer;
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover {
          text-decoration: underline;
        }
      }
      .left {
        width: 260px;
        text-align: center;
        margin-right: 20px;
        .top {
          height: 45%;
          .list {
            height: 85%;
            overflow: scroll;
          }
        }
        .bottom {
          height: 45%;
          overflow: scroll;
        }
      }
      .right {
        width: 840px;
        .main {
          width: 100%;
        }
        .footer {
          text-align: center;
        }
      }
    }
  }
}
</style>
