<template>
  <div class="container">
    <div class="wrapper">
      <div class="m-panel">
        <div class="article-wrapper">
          <span class="back-btn" @click="()=>{$router.go(-1)}">
            <i class="el-icon-back" /> 返回
          </span>
          <h2 class="article-header">
            {{article.title}}
          </h2>
          <div class="article-info">
            <span class="article-author">
              <i class="el-icon-share" /> 突变桑葚胚
            </span>
            <span class="article-time">
              <i class="el-icon-edit" /> {{article.time | parseTime}}
            </span>
            <p class="article-tags" v-show="article.tags.length">
              标签:
              <nuxt-link class="article-tag" v-for="(tag,index) in article.tags" :key="index" :to="'/blog?search='+tag">
                {{tag}}
              </nuxt-link>
            </p>
          </div>
          <hr>
          <div class="article-content" v-html="article.content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "吕世豪的博客;吕世豪的最新文章;Javascript;Vue;React;NodeJs;CSS;" +
            this.article.description
        }
      ]
    };
  },
  transition(to, from) {
    if (!from) return "slide-left";
    return to.path.length < from.path.length ? "slide-right" : "slide-left";
  },
  async asyncData({ params, apiRoot }) {
    const { data } = await axios.post(apiRoot + "/api/article/getarticles", {
      id: params.id,
      type: "article"
    });
    return {
      article: data
    };
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: underline;
}
.m-panel {
  width: 1160px;
  .article-wrapper {
    width: 100%;
    position: relative;
    .article-header {
      margin-bottom: 10px;
    }
    .article-info {
      .article-author {
        margin-right: 30px;
      }
      .article-time {
        margin-right: 30px;
      }
      .article-tags {
        white-space: nowrap;
        display: inline-block;
        a {
          display: inline-block;
          margin-right: 5px;
          font-style: italic;
          cursor: pointer;
          &:not(:last-child)::after {
            content: ",";
            color: #000;
          }
        }
      }
    }
    .article-content {
      margin-bottom: 20px;
    }
    .back-btn {
      cursor: pointer;
      font-size: 20px;
      position: absolute;
      top: 0;
      left: -120px;
      color: #fff;
      font-weight: bold;
      text-shadow: 3px 3px #000;
    }
  }
}

@media screen and (max-width: 640px) {
  .m-panel {
    font-size: 14px;
    .article-wrapper {
      width: 100%;
      position: relative;
      .article-content {
        margin-bottom: 20px;
        img {
          max-width: 314px;
        }
      }
      .back-btn {
        display: none;
      }
    }
  }
}
</style>
