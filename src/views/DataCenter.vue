<template>
  <div class="content data-center">
    <!-- 顶部轮播 -->
    <div class="data-roll">
      <Header :header="header" @updateShopId="updateShopId"/>
      <div class="data-roll-inner">
        <Swiper :shopId="shopId"/>
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
          <ve-line :loading="lLoading" :data="VeLineData" :width="chartsWidth" :height="chartsHeight"
                   :legend-visible="false"
                   :colors="lineColors" :set-option-opts="lineOpt" :data-empty="lEmpty"></ve-line>
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
          <ve-histogram :loading="hLoading" :data="VeHistogramData" :width="chartsWidth" :height="chartsHeight"
                        :legend-visible="false"
                        :colors="histColors" :data-empty="hEmpty"></ve-histogram>
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
          <ve-ring :loading="rLoading" :data="VeRingData" :width="chartsWidth" :height="chartsHeight"
                   :legend-visible="false"
                   :colors="ringColors" :data-empty="rEmpty"></ve-ring>
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
            <router-link to="/wait" class="custom-link">
              <img src="../assets/images/icon_store@2x.png">
              <span>店铺业绩</span>
            </router-link>
          </li>
          <li>
            <router-link to="/wait" class="custom-link">
              <img src="../assets/images/icon_hot@2x.png">
              <span>畅销货品</span>
            </router-link>
          </li>
          <li>
            <router-link to="/wait" class="custom-link">
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
  import Header from '@/components/Header.vue';
  import Swiper from '@/components/Swiper.vue'

  export default {
    name: "DataCenter",
    components: {Header, Swiper},
    data: function () {
      this.lineColors = ["#3399FF"];
      this.lineOpt = {
        series: [{smooth: 0}]
      };

      this.histColors = ["#FFAA22"];
      this.ringColors = ["#FF6581", "#29CCB6", "#FFAA22"];
      this.chartsHeight = "320px";
      this.chartsWidth = '100%';
      return {
        header: {
          back: false,
          to: '/',
          title: '数据中心'
        },
        lEmpty: false,
        lLoading: false,
        hEmpty: false,
        hLoading: false,
        rEmpty: false,
        rLoading: false,
        index: 0,
        items: [],

        // 折线图
        VeLineData: {columns: [], rows: []},
        // 柱状图
        VeHistogramData: {columns: [], rows: []},
        // 环形图
        VeRingData: {columns: [], rows: []},

        // 店铺id
        shopId: '',
        // 企业id
        entityId: ''
      }
    },

    created: function () {
      // 判断当前是否存储过entityId
      let
          sEId = sessionStorage.getItem('entityId'),
          qEId = this.$route.query.entityId;

      if (qEId) {
        this.entityId = qEId;
        sessionStorage.setItem('entityId', qEId);
      } else {
        if (sEId && sEId !== 'undefined') {
          this.entityId = sEId;
        }
      }
    },

    mounted: function () {
      if (!this.entityId) return this.showMessage('请先登录！');

      // 获取图表数据
      this.getChartsData();
    },

    methods: {
      // 获取图表数据
      getChartsData: function () {
        this.lLoading = true;
        this.hLoading = true;
        this.rLoading = true;

        this.Axios({
          method: 'post',
          url: '/stewards/selectcg/selectdailysalesreportAppData.do?' + Date.now(),
          data: this.$qs.stringify({entityId: this.entityId, fShopNo: this.shopId})
        }).then((res) => {
          let
              data = res.data,
              code = +data.returnCode;

          // 近7日销售日报表
          this.lLoading = false;
          this.VeLineData = !code ? {columns: ['日期', '金额'], rows: data.sellList} : {columns: [], rows: []};
          this.lEmpty = !this.VeLineData.rows.length;

          // 近7日会员增长趋势
          this.hLoading = false;
          this.VeHistogramData = !code ? {columns: ['日期', '人数'], rows: data.memberList} : {columns: [], rows: []};
          this.hEmpty = !this.VeHistogramData.rows.length;

          // 近7日消费占比
          this.rLoading = false;
          this.VeRingData = !code ? {columns: ['会员', '占比'], rows: data.consumeList} : {columns: [], rows: []};
          this.rEmpty = !this.VeRingData.rows.length;
        }).catch((err) => {
          console.log(err);
        });
      },

      // 更新选择的店铺
      updateShopId: function (id) {
        this.shopId = id;
        // 重新请求图表数据
        this.getChartsData();
      }
    }
  }
</script>

<style lang="stylus">
  .data-center
    height 100%
    .mint-header
      background-color rgba(0, 0, 0, 0)

    .data-roll
      height 320px
      background url("../assets/images/bg.png") no-repeat
      background-size 100% 78%

    .data-roll-inner
      height 280px

    .data-charts-content
      width 100%
      .v-charts-component-loading, .v-charts-data-empty
        top 30px
        height 232px
        background-color #ffffff
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
          top -66px
          text-align left

      .data-consumption-ratio
        height 266px
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
        .v-charts-component-loading, .v-charts-data-empty
          top 66px
          height 246px

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