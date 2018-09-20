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
      message: String
    }
  }
</script>

<style lang="stylus">

</style>