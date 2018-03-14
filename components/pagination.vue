<template>
  <div class="pagination">
    <nuxt-link v-if="page>1" :to="symbol+'page='+(parseInt(page)-1)">&lt; Prev</nuxt-link>
    <a v-else class="disabled">&lt; Prev</a>
    &nbsp;
    <span>{{page}}/{{totalPages}}</span>
    &nbsp;
    <nuxt-link v-if="page<totalPages" :to="symbol+'page='+(parseInt(page)+1)">Next &gt;</nuxt-link>
    <a v-else class="disabled">Next &gt;</a>
  </div>
</template>


<script>
  export default {
    props: ["page", "totalPages"],
    computed: {
      symbol() {
        const arr = this.$route.path.split("?");
        if (arr.length > 1) {
          return "&";
        } else {
          return "?";
        }
      }
    }
  };

</script>

<style lang="scss" scoped>
  .disabled {
    color: #666;
    cursor: default;
    &:hover {
      text-decoration: none;
    }
  }

</style>
