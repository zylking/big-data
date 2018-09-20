<template>
  <ul class="list-inner clerk-list-inner">
    <li v-for="(item, index) in recordValues">
      <div class="list-left">
        <div class="list-num">{{index + 1}}</div>
        <div class="list-content">
          <span class="list-title">{{item.empname}}</span>
          <span class="list-intro">{{item.shopname}}</span>
        </div>
      </div>
      <div class="list-right">{{item.zongMoney}}</div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "ClerkRecordList",
    props: {recordValues: Array}
  }
</script>

<style scoped>

</style>