<template>
  <div class="box background">
    <el-container>
      <el-header class="background-header">
        <slot name="title" />
      </el-header>
      <el-main class="background-body">
        <el-carousel @change="onchange" :autoplay="false" indicator-position="none" type="card" trigger="click" :height="height">
          <el-carousel-item :style="background(index)" v-for="(item,index) in backgrounds" :key="index">
            <p class="icons" v-show="currentIndex === index">
              <i class="el-icon-view" @click="viewBackground(index)" />
              <i v-show="admin && admin.username==='lvshihao'" class="el-icon-close" @click="deleteBackground(index)" />
            </p>
          </el-carousel-item>
        </el-carousel>
      </el-main>
      <slot name="footer" />
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      currentIndex: 0
    };
  },
  props: ["height"],
  computed: mapState(["backgrounds","admin"]),
  methods: {
    onchange(index) {
      this.currentIndex = index;
    },
    viewBackground(index) {
      window.open(this.backgrounds[index].split("/small").join(""), "_blank");
    },
    background(index) {
      return `background:url("${
        this.backgrounds[index]
      }") no-repeat center center; background-size:100% 100%`;
    },
    deleteBackground(index) {
      this.showConfirm("确定删除这张壁纸吗？").then(async () => {
        const { data } = await axios.post(
          this.apiRoot + "/api/admin/deleteimage",
          {
            filename: this.backgrounds[index]
          }
        );
        if (data === 1) {
          this.showMessage("success", "删除成功");
          this.$router.go(0);
        } else {
          this.showMessage("error", "删除失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  background: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 10px;
  box-shadow: 0 10px 30px 0 #000;
}
.background {
  .background-header {
    line-height: 60px;
  }
  .background-body {
    position: relative;
    .icons {
      width: 100%;
      text-align: center;
      position: absolute;
      bottom: 0;
      font-size: 20px;
      background: rgba(0, 0, 0, 0.7);
      height: 30px;
      line-height: 30px;
      color: white;
      i {
        margin: 0 20px;
      }
    }
  }
  .background-footer {
    text-align: left;
  }
}
</style>

