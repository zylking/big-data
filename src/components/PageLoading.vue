<template>
  <div class="mt-page-loading">
    <mt-spinner type="double-bounce" color="#3399FF" :size="size"></mt-spinner>
  </div>
</template>

<script>
  export default {
    name: "PageLoading",
    data: function() {
      return {
        size: 38
      }
    }
  }
</script>

<style lang="stylus">
  .mt-page-loading
    transform translateY(70px)
</style>