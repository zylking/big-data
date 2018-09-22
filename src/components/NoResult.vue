<template>
  <div class="mt-no-result">
    <img src="../assets/images/icon_no-data@2x.png">
    <span>{{message}}</span>
  </div>
</template>

<script>
  export default {
    name: "NoResult",
    props: {
      message: {
        default: '搜索不到您要的结果哦~'
      }
    }
  }
</script>

<style lang="stylus">
  .mt-no-result
    display flex
    flex-direction column
    height 100%
    justify-content center
    align-items center
    img
      width 150px
      transform translateY(-44px)
    span
      transform translateY(-56px)
      color #666666
</style>