<template>
  <ul class="list-inner-o sales-details-list-inner">
    <li v-for="item in listValues">
      <p class="list-title">{{item.goodname}}</p>
      <p class="list-intro">
        <span>货品编号：</span>
        <span>{{item.goodcode}}</span>
      </p>
      <p class="list-intro">
        <span>金额：</span>
        <span>{{item.money}}</span>
      </p>
      <p class="list-intro">
        <span>售出：</span>
        <span>{{item.sellOut}}件</span>
      </p>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "SaleDetailsList",
    props: {
      listValues: Array
    }
  }
</script>

<style lang="stylus">

</style>