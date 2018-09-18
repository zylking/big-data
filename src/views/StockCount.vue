<template>
  <div class="content stock-count">
    <mt-header class="mt-header" :title="title">
      <router-link to="/index" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <!-- 库存统计内容 -->
    <div class="list stock-count-list">
      <Search :pHolder="holder" :wrapperClass="wrapperClass"/>

      <ul class="sales-base-type">
        <li @click="popupCategory">
          <span>全部类别</span>
          <i class="mt-allow-right"></i>
        </li>
        <li @click="">
          <span>供应商</span>
          <i class="mt-allow-right"></i>
        </li>
      </ul>
      <ul class="sales-base-info">
        <li>
          <span class="info-title">库存数量</span>
          <span class="info-num">816</span>
        </li>
        <li>
          <span class="info-title">库存金额</span>
          <span class="info-num">256.40</span>
        </li>
      </ul>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="0">
          <ul class="list-inner sales-details-list-inner">
            <li>
              <div class="list-left">
                <div class="list-num">1</div>
                <div class="list-content">
                  <span class="list-title">周新雨</span>
                  <span class="list-intro">城西银泰店</span>
                </div>
              </div>
              <div class="list-right">2000.00</div>
            </li>
            <li>
              <div class="list-left">
                <div class="list-num">2</div>
                <div class="list-content">
                  <span class="list-title">刘丽</span>
                  <span class="list-intro">城西银泰店</span>
                </div>
              </div>
              <div class="list-right">2000.00</div>
            </li>
            <li>
              <div class="list-left">
                <div class="list-num">3</div>
                <div class="list-content">
                  <span class="list-title">张三</span>
                  <span class="list-intro">城西银泰店</span>
                </div>
              </div>
              <div class="list-right">2000.00</div>
            </li>
            <li>
              <div class="list-left">
                <div class="list-num">4</div>
                <div class="list-content">
                  <span class="list-title">赵四</span>
                  <span class="list-intro">城西银泰店</span>
                </div>
              </div>
              <div class="list-right">2000.00</div>
            </li>
            <li>
              <div class="list-left">
                <div class="list-num">5</div>
                <div class="list-content">
                  <span class="list-title">雷涛</span>
                  <span class="list-intro">城西银泰店</span>
                </div>
              </div>
              <div class="list-right">2000.00</div>
            </li>
          </ul>
        </mt-tab-container-item>
        <!--<mt-tab-container-item id="-1">-->
          <!--<mt-cell v-for="n in 6" :title="'选项 ' + n"/>-->
        <!--</mt-tab-container-item>-->
      </mt-tab-container>

      <mt-popup position="bottom" v-model="popupVisible">
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </mt-popup>
    </div>
  </div>
</template>

<script>
  import Search from '@/components/Search.vue'

  export default {
    name: "StockCount",
    components: {Search},

    data: function() {
      return {
        title: '库存统计',
        selected: '0',
        holder: '货品名称/编码查询',
        wrapperClass: {'mt-search': true}
      }
    }
  }
</script>

<style lang="stylus">
  .sales-base-type
    display flex
    align-items center
    justify-content center
    height 40px
    border-top 1px solid #dddddd
    background-color #ffffff
    li
      position relative
      width 50%
      height 26px
      line-height 26px
      .mt-allow-right
        display inline-block
        margin-left 8px
        width 5px
        height 5px
        border 2px solid #979797
        border-bottom-width 0
        border-left-width 0
        -webkit-transform translateY(-24%) rotate(45deg)
        transform translateY(-24%) rotate(45deg)
    li:first-child
      width calc(50% - 1px)
      border-right 1px solid #dddddd

  .sales-base-info
    display flex
    align-items center
    height 64px
    border-top 1px solid #dddddd
    background-color #ffffff
    li
      display flex
      flex-direction column
      width calc(50% - 1px)
      border-right 1px solid #dddddd
      .info-title
        color #999999
        margin-bottom 5px
    li:last-child
      border 0
      width 50%
</style>