<template>
  <div class="container">
    <div class="wrapper">
      <!-- <div class="m-panel">
        <div class="top">
          <h2 class="title">
            电影
          </h2>
          <el-carousel :autoplay="false" indicator-position="none" type="card" height="300px">
            <el-carousel-item v-for="(item,index) in movies" :key="index" :style="background(index)" >
              <p class="movie-title">
                {{item.title}}
              </p>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="bottom">
          <div class="left">
            <div class="article-wrapper">
              <h2 class="title">文字</h2>
              <hr>
              <ul class="article-list">
                <p v-if="articles.length<1">暂无最新文章</p>
                <li v-else class="article" v-for="(article,index) in articles" :key="index">
                  <h2 class="article-title">
                    <nuxt-link :to="'/blog/article'+article._id">
                      {{article.title}}
                    </nuxt-link>
                    <span>
                      {{article.time | parseTime}}
                    </span>
                  </h2>
                </li>
              </ul>
            </div>
          </div>
          <div class="right">
            <Background height="180px">
              <h2 slot="title" class="title">背景</h2>
            </Background>
          </div>
        </div>
      </div> -->
      <div class="mobile">
        <img :src="this.apiRoot+'/avatar.jpg'" alt="我的头像" class="avatar">
        <p class="title">
          欢迎来到我的主页
        </p>
        <p class="description">
          更多请查看<a href="http://github.com/Asweallcan" target="_blank">我的Github</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import Background from "~/components/background.vue";
export default {
  head() {
    return {
      title: "繁华依旧",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "吕世豪;前端;电影;博客"
        }
      ]
    };
  },
  transition: "slide-right",
  // async asyncData({ apiRoot }) {
  //   try {
  //     const articles = await axios.post(apiRoot + "/api/article/getarticles", {
  //       type: "index"
  //     });
  //     const movies = await axios.post(apiRoot + "/api/movie/getmovies");
  //     return {
  //       articles: articles.data,
  //       movies: movies.data
  //     };
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // },
  // data() {
  //   return {
  //     articles: []
  //   };
  // },
  components: {
    Background
  },
  methods: {
    background(index) {
      return `background:url('${this.apiRoot}/movies/${
        this.movies[index]._id
      }/${
        this.movies[index].imageName
      }') no-repeat center center;background-size:cover;`;
    }
  }
};
</script>


<style lang="scss" scoped>
.title {
  font-size: 25px;
}
// .mobile{
//   display: none;
// }
// .container {
//   .wrapper {
//     .m-panel {
//       min-width: 1160px;
//       .top {
//         width: 100%;
//         text-align: center;
//         position: relative;
//         margin-bottom: 30px;
//         .title {
//           height: 60px;
//           line-height: 60px;
//         }
//         .movie-title {
//           width: 100%;
//           position: absolute;
//           bottom: 0;
//           height: 40px;
//           line-height: 40px;
//           background: rgba(0, 0, 0, 0.8);
//           color: #fff;
//           font-size: 20px;
//         }
//       }
//       .bottom {
//         display: flex;
//         justify-content: space-between;
//         width: 100%;
//         .left {
//           width: 40%;
//           margin-right: 20px;
//           .article-wrapper {
//             width: 100%;
//             .title {
//               height: 60px;
//               line-height: 60px;
//               text-align: center;
//             }
//             .article {
//               margin: 10px 0;
//               .article-title {
//                 font-weight: normal;
//                 font-size: 16px;
//               }
//               p {
//                 width: 100%;
//                 height: 27px;
//                 white-space: nowrap;
//                 display: flex;
//                 justify-content: space-between;
//                 a {
//                   display: inline-block;
//                   max-width: 600px;
//                   font-size: 16px;
//                   white-space: nowrap;
//                   overflow: hidden;
//                   text-overflow: ellipsis;
//                 }
//                 span {
//                   color: #777;
//                 }
//               }
//             }
//           }
//         }
//         .right {
//           width: 60%;
//           display: inline-block;
//           .box {
//             box-shadow: none;
//             background: transparent;
//             padding: 0;
//           }
//         }
//       }
//     }
//   }
// }

.container {
  .wrapper {
    .m-panel {
      display: none;
    }
    .mobile {
      background: rgba(255, 255, 255, 0.7);
      box-shadow: 0 10px 30px 0 #000;
      width: 320px;
      display: block;
      border-radius: 20px;
      text-align: center;
      padding: 35px;
      .avatar {
        width: 250px;
        height: auto;
      }
      .description {
        a {
          color: #409eff;
        }
      }
    }
  }
}

@media screen and (max-width: 640px) {
  .header {
    display: none;
  }
  .container {
    .wrapper {
      .mobile {
        box-shadow: none;
      }
    }
  }
}
</style>
