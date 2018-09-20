<template>
  <ul class="list-inner-o stock-count-list-inner">
    <li v-for="item in listValues">
      <p class="list-title">{{item.goodname}}</p>
      <p class="list-intro">
        <span>货品编号：</span>
        <span>{{item.goodcode}}</span>
      </p>
      <p class="list-intro">
        <span>库存数量：</span>
        <span>{{item.stocknum}}</span>
      </p>
      <p class="list-intro">
        <span>库存金额：</span>
        <span>{{item.stockmoney}}</span>
      </p>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "StockCountList",
    props: {
      listValues: Array
    }
  }
</script>

<style lang="stylus">
  .list
    .mint-tab-container
      height calc(100% - 168px)
</style>