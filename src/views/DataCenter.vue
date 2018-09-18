<template>
  <div class="content data-center">
    <!-- 顶部轮播 -->
    <div class="data-roll">
      <mt-header class="mt-opacity-header" title="数据中心">
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
      <div class="data-roll-inner">
        <Swiper/>
      </div>
    </div>

    <div class="data-charts-content">
      <!-- 销售日报表 -->
      <div class="charts-div data-sales-report">
        <div class="title">
          <p class="title-left">
            <span>销售日报表</span>
            <span class="title-intro">（近7天）</span>
          </p>
          <p class="title-right">金额 / 日期</p>
        </div>
        <div class="charts-div-inner">
          <ve-line :data="VeLineData" :height="chartsHeight" :legend-visible="false"
                   :colors="lineColors" :set-option-opts="lineOpt"></ve-line>
        </div>
      </div>
      <!-- 会员增长趋势 -->
      <div class="charts-div data-member-growth">
        <div class="title">
          <p class="title-left">
            <span>会员增长趋势</span>
            <span class="title-intro">（近7天）</span>
          </p>
          <p class="title-right">人数 / 日期</p>
        </div>
        <div class="charts-div-inner">
          <ve-histogram :data="VeHistogramData" :height="chartsHeight" :legend-visible="false"
                        :colors="histColors"></ve-histogram>
        </div>
      </div>
      <!-- 消费占比 -->
      <div class="charts-div data-consumption-ratio">
        <div class="title">
          <p class="title-left">
            <span>消费占比</span>
            <span class="title-intro">（近7天）</span>
          </p>
          <ul class="title-right">
            <li>
              <label class="label-new"></label>
              <span>新会员</span>
            </li>
            <li>
              <label class="label-old"></label>
              <span>老会员</span>
            </li>
            <li>
              <label class="label-tourist"></label>
              <span>游客</span>
            </li>
          </ul>
        </div>
        <div class="charts-div-inner">
          <ve-ring :data="VeRingData" :height="chartsHeight" :legend-visible="false"
                   :colors="ringColors"></ve-ring>
        </div>
      </div>
      <!-- 排行榜 -->
      <div class="charts-div data-rank">
        <div class="title">排行榜</div>
        <ul class="charts-div-inner">
          <li>
            <router-link to="/clerk" class="custom-link">
              <img src="../assets/images/icon_salesman@2x.png">
              <span>店员业绩</span>
            </router-link>
          </li>
          <li>
            <router-link to="/store" class="custom-link">
              <img src="../assets/images/icon_store@2x.png">
              <span>店铺业绩</span>
            </router-link>
          </li>
          <li>
            <router-link to="/sell" class="custom-link">
              <img src="../assets/images/icon_hot@2x.png">
              <span>畅销货品</span>
            </router-link>
          </li>
          <li>
            <router-link to="/badSell" class="custom-link">
              <img src="../assets/images/icon_unsalable@2x.png">
              <span>滞销货品</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from '@/components/Swiper.vue'

  export default {
    name: "DataCenter",
    components: {Swiper},
    data: function () {
      this.lineColors = ["#3399FF"];
      this.lineOpt = {
        series: [{smooth: 0}]
      };

      this.histColors = ["#FFAA22"];
      this.ringColors = ["#FF6581", "#29CCB6", "#FFAA22"];
      this.chartsHeight = "320px";
      return {
        index: 0,
        items: [],

        VeLineData: {
          columns: ['日期', '金额'],
          rows: [
            {'日期': '03.01', '金额': 900},
            {'日期': '03.02', '金额': 1450},
            {'日期': '03.03', '金额': 900},
            {'日期': '03.04', '金额': 1300},
            {'日期': '03.05', '金额': 2240},
            {'日期': '03.06', '金额': 1200},
            {'日期': '03.07', '金额': 2300}
          ]
        },

        VeHistogramData: {
          columns: ['日期', '人数'],
          rows: [
            {'日期': '03.01', '人数': 9},
            {'日期': '03.02', '人数': 15},
            {'日期': '03.03', '人数': 13},
            {'日期': '03.04', '人数': 33},
            {'日期': '03.05', '人数': 19},
            {'日期': '03.06', '人数': 28},
            {'日期': '03.07', '人数': 28}
          ]
        },

        VeRingData: {
          columns: ['会员', '占比'],
          rows: [
            {'会员': '游客', '占比': 35},
            {'会员': '新会员', '占比': 40},
            {'会员': '老会员', '占比': 25}
          ]
        }
      }
    },
    mounted: function () {
      // this.Axios('url');
    },

    methods: {
      // 加载轮播数据
    },

    watch: {
      index(val) {
        console.log(val);
      }
    }
  }
</script>

<style lang="stylus">
  .data-center
    height 100%
    .mt-opacity-header
      background-color rgba(0, 0, 0, 0)
      h1.mint-header-title
        font-size 18px

    .data-roll
      height 320px
      background url("../assets/images/bg.png") no-repeat
      background-size 100% 78%

    .data-roll-inner
      height 280px

    .data-charts-content
      width 100%
      .charts-div
        padding 10px
        width 88%
        height 252px
        overflow hidden
        margin 14px auto 0 auto
        border-radius 5px
        background-color #ffffff
        .title
          display flex
          justify-content space-between
          text-align left
          span.title-intro
            color #666666
          .title-right
            color #999999

        .ve-line, .ve-histogram
          top -30px
          text-align left
        .ve-ring
          top -84px
          text-align left

      .data-consumption-ratio
        .title-right
          display flex
          li
            color #333333
            display flex
            align-items center
            label
              display inline-block
              margin-right 2px
              margin-left 4px
              width 8px
              height 8px
              border-radius 8px
            .label-new
              background-color #29CCB6
            .label-old
              background-color #FFAA22
            .label-tourist
              background-color #FF6581

      .data-rank
        height 132px
        margin-bottom 14px
        ul
          display flex
          align-items center
          width 100%
          height 112px
          li
            width 25%
            img
              width 31px
            a
              display flex
              width 100%
              flex-direction column
              justify-content center
              align-items center
</style>