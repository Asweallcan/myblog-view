<template>
  <div class="container">
    <h2 class="hidden">电影主页</h2>
    <div class="wrapper">
      <div class="panel">
        <ul class="movies">
          <li v-for="(item,index) in movies" :key="index" class="movie" :tabindex="index">
            <img class="left" :src="apiRoot+'/movies/'+item._id+'/'+item.imageName" :alt="item.title+'电影海报'">
            <div class="right">
              <h3 class="title">{{item.title}}</h3>
              <p>
                主演:&nbsp;
                <a class="star" v-for="(star,index2) in item.stars" :key="index2" :href="'https://www.baidu.com/s?wd='+star" target="_blank">
                  {{star}}
                </a>
              </p>
              <p>
                导演:&nbsp;
                <a class="director" :href="'https://www.baidu.com/s?wd='+item.director" target="_blank">
                  {{item.director}}
                </a>
              </p>
              <p>
                评分:&nbsp;
                <mark>{{item.rate}}</mark>
              </p>
              <p class="description">
                摘要:&nbsp; {{item.description}}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    head: {
      title: "繁华依旧",
      meta: [{
        hid: "description",
        name: "description",
        content: "吕世豪;前端;电影;博客;"
      }]
    },
    transition(to, from) {
      if (!from) {
        return "slide-right";
      }
      return to.path > from.path ? "slide-left" : "slide-right";
    },
    async asyncData({
      apiRoot
    }) {
      const {
        data
      } = await axios.post(apiRoot + "/api/movie/getmovies");
      const meta = [];
      data.forEach(element => {
        meta.push(element.title);
      });
      return {
        movies: data
      };
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
    min-height: 100%;
  }

  .panel {
    width: 840px;
    position: relative;
    .movies {
      width: 100%;
      &::after {
        content: "";
        clear: both;
        visibility: none;
        display: block;
      }
      .movie {
        width: 100%;
        margin-right: 20px;
        margin-bottom: 20px;
        text-align: center;
        background: rgba(255, 255, 255, 0.7);
        box-shadow: 0 10px 30px 0 #000;
        padding: 10px;
        position: relative;
        .left {
          width: 300px;
          height: 180px;
          margin-right: 18px;
          float: left;
        }
        .right {
          text-align: left;
          width: 100%;
          min-height: 180px;
          p{
            margin-bottom: 5px;
          }
          .title {
            text-align: center;
          }
          .icon {
            text-align: center;
          }
        }
      }
    }
  }

  @media screen and (max-width:640px) {
    .movie{
      .left{
        display: block;
        width: 100% !important;
      }
    }
  }

</style>
