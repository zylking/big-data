<template>
  <ul class="list-inner-o stock-count-list-inner" v-infinite-scroll="loadMore" infinite-scroll-disabled="disabled"
      infinite-scroll-distance="10"
      infinite-scroll-immediate-check="check">
    <li v-for="item in listValues.data">
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
    <li id="mt-infinite-loading" v-if="loading">
      <mt-spinner type="double-bounce"></mt-spinner>
      <p>加载中...</p>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "StockCountList",
    props: {
      listValues: Object
    },

    data: function () {
      return {
        check: false,   // 指令被绑定到元素之后，不检查是否立即执行加载
        disabled: false,
        loading: false,
      }
    },

    methods: {
      // 往下滚动加载
      loadMore: function () {
        if (!this.listValues.noMore) return;

        this.loading = true;
        this.disabled = true;

        this.$emit('loadMoreList', () => {
          this.loading = false;
          this.disabled = false;
        });
      }
    }
  }
</script>