<template>
  <div class="data-roll-inner">
    <ul class="data-roll-ul" @touchstart="touchStartHandle" @touchmove="touchMoveHandle" @touchend="touchEndHandle">
      <li>
        <img src="../assets/images/icon_sales@2x.png">
        <p class="swiper-card-num">{{todaySales}}</p>
        <p class="swiper-card-title">今日销售额(元)</p>
        <router-link to="/saleDetails">
          <mt-button size="small" type="primary">查看详情</mt-button>
        </router-link>
      </li>
      <li>
        <img src="../assets/images/icon_refund@2x.png">
        <p class="swiper-card-num">{{todayRefunds}}</p>
        <p class="swiper-card-title">今日退货金额(元)</p>
        <router-link to="/wait">
          <mt-button size="small" type="primary">查看详情</mt-button>
        </router-link>
      </li>
      <li>
        <img src="../assets/images/icon_recharge@2x.png">
        <p class="swiper-card-num">{{todayCredit}}</p>
        <p class="swiper-card-title">今日充值(元)</p>
        <router-link to="/wait">
          <mt-button size="small" type="primary">查看详情</mt-button>
        </router-link>
      </li>
      <li>
        <img src="../assets/images/icon_vip@2x.png">
        <p class="swiper-card-num">{{todayMember}}</p>
        <p class="swiper-card-title">今日新增会员</p>
        <router-link to="/wait">
          <mt-button size="small" type="primary">查看详情</mt-button>
        </router-link>
      </li>
      <li>
        <img src="../assets/images/icon_stock@2x.png">
        <p class="swiper-card-num">{{todayStock}}</p>
        <p class="swiper-card-title">库存总量</p>
        <router-link to="/stockCount">
          <mt-button size="small" type="primary">查看详情</mt-button>
        </router-link>
      </li>
    </ul>

    <div class="roll-ul-flag">
      <span :class="index === 0 ? 'active': ''"></span>
      <span :class="index === 1 ? 'active': ''"></span>
      <span :class="index === 2 ? 'active': ''"></span>
      <span :class="index === 3 ? 'active': ''"></span>
      <span :class="index === 4 ? 'active': ''"></span>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Swiper",
    data: function () {
      return {
        x0: 0,
        y0: 0,
        offsetX: 0,
        offsetY: 0,
        hasMoved: 0,
        lock: 0,
        css: ['active', 'prev', 'next', 'last-prev', 'last-next'],
        swiperAuto: true,   // 默认自动轮播是开启的
        swiperTimer: '',
        index: 0,

        entityId: '',

        // 页面数据
        todaySales: '0.00',
        todayRefunds: '0.00',
        todayCredit: '0.00',
        todayMember: 0,
        todayStock: 0
      };
    },
    props: ['shopId'],
    mounted: function () {
      let sEId = sessionStorage.getItem('entityId');
      if (!sEId || sEId === 'undefined') {
        // 加载完成后开启轮播
        return this.init();
      }

      this.entityId = sEId;
      // 获取数据
      this.getSwiperData();
    },

    methods: {
      // 获取轮播数据
      getSwiperData: function () {
        this.Axios({
          method: 'post',
          url: '/stewards/admin/wholesaler/getAppTodayMonthAppData.do',
          data: this.$qs.stringify({entityId: this.entityId, fShopNo: this.shopId})
        }).then((res) => {
          let
              data = res.data,
              code = +data.returnCode;

          this.todaySales = !code ? data.todaySellMoney : '0.00';
          this.todayRefunds = !code ? data.todayRefundsMoney : '0.00';
          this.todayCredit = !code ? data.todayCreditMoney : '0.00';
          this.todayMember = !code ? data.todayAddMenber : 0;
          this.todayStock = !code ? data.todayStock : 0;

          // 加载完成后开启轮播
          this.init();
        }).catch((err) => {
          console.log(err);
        });
      },

      touchStartHandle: function (e) {
        // 当手动滑动时，清除自动轮播
        this.swiperAuto = false;
        clearInterval(this.swiperTimer);

        let touch = e.targetTouches[0];
        this.x0 = touch.pageX;
        this.y0 = touch.pageY;
        this.hasMoved = 0;
        this.lock = 0;
      },

      touchMoveHandle: function (e) {
        if (this.lock) return;

        let touch = e.targetTouches[0];
        this.offsetX = this.x0 - touch.pageX;
        this.offsetY = this.y0 - touch.pageY;

        // 阻止滚动
        if (!this.hasMoved) {
          this.hasMoved = 1;
          if (Math.abs(this.offsetX) > Math.abs(this.offsetY)) e.preventDefault();
        }

        if (this.offsetX <= -50) {
          // 向右
          this.queue.unshift(this.queue.pop());
          this.lock = 1;
          this.swap();
        } else if (this.offsetX >= 50) {
          // 向左
          this.queue.push(this.queue.shift());
          this.lock = 1;
          this.swap();
        }
      },

      touchEndHandle: function () {
        // 触摸结束后，如果自动轮播是关闭着的，则重新开启
        if (!this.swiperAuto) this.selfSwiper();
      },

      swap: function (withoutTransition) {
        let queue = [].concat(this.queue),
            count = 0,
            len = this.visual.length,
            visual = new Array(len),
            odd = 1;

        // 提取前三个元素与后三个元素
        while (count < 5 && queue.length > 0) {
          visual[odd ? queue.shift() : queue.pop()] = this.css[count++] + (withoutTransition ? '' : ' transition');
          odd = !odd; // 取反
        }

        // 对比一下数组 
        for (let i = 0; i < len; ++i) {
          if (visual[i] !== this.visual[i]) {
            if (visual[i].indexOf('active') !== -1) this.index = i;
            this.visual[i] = visual[i];
            this.item[i].className = this.visual[i] || '';
          }
        }
      },

      selfSwiper: function () {
        let that = this;

        // 自动轮播，每隔4秒1次
        this.swiperTimer = setInterval(function () {
          that.queue.push(that.queue.shift());
          that.lock = 1;
          that.swap();
        }, 4000);
      },

      init: function () {
        this.item = this.$el.querySelectorAll("li");
        this.queue = function (len) {
          // 索引列表，用于处理切换的序号队列
          // 一个对应 item 的数组，记录 DOM 信息
          let arr = [];
          for (let i = 0; i < len; ++i) arr[i] = i;
          return arr;
        }(this.item.length);

        this.visual = new Array(this.item.length); // 与 item 做对应的虚拟DOM
        // 初始排版
        this.swap("without transition");
        // 开启自动轮播
        this.selfSwiper();
      }
    },
    watch: {
      shopId: function () {
        // 如果店铺ID发生变更，则重新请求轮播数据
        this.getSwiperData();
      }
    }
  }
</script>

<style lang="stylus">
  .data-roll-inner
    height 280px
    .data-roll-ul
      display flex
      justify-content center
      position relative
      top 60px
      width 100%
      height 190px
      transform-style preserve-3d
      -webkit-transform-style preserve-3d
      li
        display flex
        flex-direction column
        justify-content center
        align-items center
        position absolute
        width 170px
        height 190px
        left 0
        top 0
        right 0
        bottom 0
        margin auto
        border-radius 5px
        background-color #ffffff
        .swiper-card-num
          font-size 20px
          color #000000
        .swiper-card-title
          font-size 12px
          color #666666
          margin-bottom 16px
        .mint-button--small
          padding 0
          width 88px
          height 30px
        img
          width 39px
          margin-bottom 8px

      li:first-child
        z-index 4

      li.active
        opacity 1
        z-index 3
        visibility visible
        transform translate3d(0, 0, 10px) scale3d(1, 1, 1)
        -webkit-transform translate3d(0, 0, 10px) scale3d(1, 1, 1)
      li.next
        opacity .8
        z-index 2
        visibility visible
        transform translate3d(46px, 0, 6px) scale3d(.75, .85, 1)
        -webkit-transform translate3d(46px, 0, 6px) scale3d(.75, .85, 1)
      li.prev
        opacity .8
        z-index 2
        visibility visible
        transform translate3d(-46px, 0, 6px) scale3d(.75, .85, 1)
        -webkit-transform translate3d(-46px, 0, 6px) scale3d(.75, .85, 1)
      li.last-prev
        opacity .55
        z-index 1
        transform translate3d(-80px, 0, 2px) scale3d(.6, .7, 1)
        -webkit-transform translate3d(-80px, 0, 2px) scale3d(.6, .7, 1)
        visibility visible
      li.last-next
        opacity .55
        z-index 1
        transform translate3d(80px, 0, 2px) scale3d(.6, .7, 1)
        -webkit-transform translate3d(80px, 0, 2px) scale3d(.6, .7, 1)
        visibility visible
      .transition
        transition transform .5s ease, opacity .5s ease
        -webkit-transition -webkit-transform .5s ease, opacity .5s ease

    .roll-ul-flag
      transform translateY(66px)
      height 10px
      span
        display inline-block
        margin 0 3px
        width 8px
        height 8px
        background-color #AFBCC8
        border-radius 8px
      span.active
        background-color #3399FF;

</style>