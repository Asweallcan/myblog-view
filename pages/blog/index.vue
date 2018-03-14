<template>
  <div class="container">
    <h2 class="hidden">吕世豪的博客</h2>
    <div class="wrapper">
      <div class="m-panel">
        <scroll-to-top/>
        <el-input class="search-input" placeholder="请输入..." v-model="Search">
          <el-button slot="append" icon="el-icon-search" @click="doSeach" />
        </el-input>
        <ul class="article-wrapper">
          <li class="article" v-for="(item,index) in articles" :key="index">
            <h3>
              <nuxt-link class="article-header" :to="'/blog/article/'+item._id">
                {{item.title}}
              </nuxt-link>
            </h3>
            <div class="article-info">
              <span class="article-author">
                <i class="el-icon-share" /> {{item.nickname}}
              </span>
              <span class="article-time">
                <i class="el-icon-edit" /> {{item.time | parseTime}}
              </span>
              <p v-show="item.tags.length" class="article-tags">
                标签:
                <nuxt-link class="article-tag" v-for="(tag,index) in item.tags" :key="index" :to="'/blog?search='+tag">
                  {{tag}}
                </nuxt-link>
              </p>
            </div>
            <div class="article-content">
              <div class="article-text">
                <p>
                  <em>摘要 :</em>&nbsp;{{item.description}}
                </p>
                <p>
                  <img v-if="item.image" :src="apiRoot+'/articles/'+item.title+'/'+item.image" alt="文章图片">
                </p>
              </div>
            </div>
          </li>
          <div class="pagination">
            <pagination :page="page" :totalPages="totalPages" />
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ScrollToTop from "~/components/scrollToTop";
import Pagination from "~/components/pagination";
export default {
  watchQuery: ["page", "search"],
  key: to => to.fullPath,
  transition(to, from) {
    if (!from) return "slide-left";
    return to.query.page < from.query.page ? "slide-right" : "slide-left";
  },
  head() {
    return {
      title: "繁华依旧",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "吕世豪的博客;吕世豪的最新文章;Javascript;Vue;React;NodeJs;CSS;" +
            this.meta.join(";")
        }
      ]
    };
  },
  async asyncData({ apiRoot, query }) {
    const { data } = await axios.post(apiRoot + "/api/article/getarticles", {
      type: "blog",
      page: query.page || 1,
      search: query.search
    });
    const meta = [];
    data.articles.forEach(item => {
      meta.push(item.title);
    });
    return {
      articles: data.articles,
      totalPages: data.totalPages,
      page: query.page || 1,
      meta
    };
  },
  components: {
    ScrollToTop,
    Pagination
  },
  data() {
    return {
      Search: this.$route.query.search
    };
  },
  methods: {
    doSeach() {
      if (this.Search) {
        this.$router.push(`/blog?search=${this.Search}`);
      } else {
        this.$router.push("/blog");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: underline;
  font-style: italic;
  margin-right: 5px;
}

.container {
  .wrapper {
    .m-panel {
      width: 1160px;
      .search-input {
        width: 300px;
        position: absolute;
        right: -100px;
        top: -75px;
        z-index: 101;
      }
      box-shadow: 0 10px 30px 0 #000;
      position: relative;
      .article-wrapper {
        position: relative;
        .article {
          margin-bottom: 10px;
          border-bottom: 1px solid #000;
          position: relative;
          .article-header {
            margin-bottom: 10px;
            cursor: pointer;
            display: inline-block;
            &:hover {
              text-decoration: underline;
            }
          }
          .article-info {
            margin-bottom: 10px;
            .article-author,
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
            margin-bottom: 10px;
            .article-text {
              &::after {
                content: "......";
                display: block;
              }
            }
          }
        }
        .pagination {
          text-align: center;
          width: 100%;
        }
      }
    }
  }
}

@media screen and (max-width: 640px) {
  .container {
    .wrapper {
      .m-panel {
        font-size: 14px;
        .search-input {
          display: none;
        }
        box-shadow: none;
        .article-wrapper {
          position: relative;
          .article {
            .article-content {
              margin-bottom: 10px;
              .article-text {
                img {
                  width: 100%;
                }
              }
            }
          }
          .pagination {
            text-align: center;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
