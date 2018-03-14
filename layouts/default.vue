<template>
  <div :style="background">
      <vue-header/>
      <nuxt/>
  </div>
</template>

<script>
import VueHeader from "~/components/header.vue";
import { mapState } from "vuex";
export default {
  scrollToTop: true,
  components: {
    VueHeader
  },
  computed: mapState(["background"])
};
</script>


<style>
html,
body,
#__nuxt,
#__layout {
  background-color: #ccc;
  height: 100%;
}

#__layout > div {
  min-height: 100%;
}

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

</style>
