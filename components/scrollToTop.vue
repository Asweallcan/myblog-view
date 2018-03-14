<template>
  <div @click="scrollToTop" class="box">
      <i class="el-icon-caret-top"/>
  </div>
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: -100px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: all 0.3s;
    &:hover{
        background: #fff;
    }
}
</style>


