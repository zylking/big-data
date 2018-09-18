<template>
  <div class="content sale-details">
    <mt-header class="mt-header" :title="title">
      <router-link to="/index" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <!-- 销售详情内容 -->
    <div class="list sales-details-list">
      <mt-navbar v-model="selected">
        <mt-tab-item id="0">今天</mt-tab-item>
        <mt-tab-item id="1">昨天</mt-tab-item>
        <mt-tab-item id="2">近7天</mt-tab-item>
        <mt-tab-item id="3">近30天</mt-tab-item>
        <mt-tab-item id="-1">自定义</mt-tab-item>
      </mt-navbar>

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
          <span class="info-title">销售数量</span>
          <span class="info-num">816</span>
        </li>
        <li>
          <span class="info-title">销售金额</span>
          <span class="info-num">256.40</span>
        </li>
        <li>
          <span class="info-title">成本总额</span>
          <span class="info-num">48.20</span>
        </li>
        <li>
          <span class="info-title">总利润</span>
          <span class="info-num">715.71</span>
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
        <mt-tab-container-item id="1">
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
        </mt-tab-container-item>
        <mt-tab-container-item id="-1">
          <!--<mt-cell v-for="n in 6" :title="'选项 ' + n"/>-->
        </mt-tab-container-item>
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
    name: "SaleDetails",
    components: {Search},

    data: function () {
      return {
        title: '销售详情',
        selected: '0',
        popupVisible: false,
        holder: '货品名称/编码查询',
        wrapperClass: {'mt-search': true, 'mt-date': false},
        slots: [
          {
            flex: 1,
            values: ['全部类别', '类别1', '类别2', '类别3', '类别4', '类别5']
          }
        ]
      }
    },

    watch: {
      selected: function (id) {
        if (+id === -1) {
          // 显示自定义时间间隔
          this.wrapperClass = {'mt-search': false, 'mt-date': true}
        } else {
          this.wrapperClass = {'mt-search': true, 'mt-date': false}
        }
      }
    },

    methods: {
      onValuesChange: function (picker, value) {

      },

      popupCategory: function () {
        this.popupVisible = true;
      }
    }
  }
</script>

<style lang="stylus">
  .mint-popup
    width 100%

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
      width calc(25% - 1px)
      border-right 1px solid #dddddd
      .info-title
        color #999999
        margin-bottom 5px
    li:last-child
      border 0
      width 25%

</style>