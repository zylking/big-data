<template>
  <ul class="list-inner clerk-list-inner" v-infinite-scroll="loadMore" infinite-scroll-disabled="disabled"
      infinite-scroll-distance="10"
      infinite-scroll-immediate-check="check">
    <li v-for="(item, index) in recordValues.data">
      <div class="list-left">
        <div class="list-num">{{index + 1}}</div>
        <div class="list-content">
          <span class="list-title">{{item.empname}}</span>
          <span class="list-intro">{{item.shopname}}</span>
        </div>
      </div>
      <div class="list-right">{{item.zongMoney}}</div>
    </li>
    <li id="mt-infinite-loading" v-if="loading">
      <mt-spinner type="double-bounce"></mt-spinner>
      <p>加载中...</p>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "ClerkRecordList",
    props: {recordValues: Object},
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