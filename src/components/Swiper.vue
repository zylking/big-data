<template>
  <ul class="data-roll-ul" @touchstart="touchStartHandle" @touchmove="touchMoveHandle" @touchend="touchEndHandle">
    <li>
      <img src="../assets/images/icon_sales@2x.png">
      <p class="swiper-card-num">204800.00</p>
      <p class="swiper-card-title">今日销售额(元)</p>
      <router-link to="/saleDetails">
        <mt-button size="small" type="primary">查看详情</mt-button>
      </router-link>
    </li>
    <li>
      <img src="../assets/images/icon_refund@2x.png">
      <p class="swiper-card-num">12500.00</p>
      <p class="swiper-card-title">今日退货金额(元)</p>
      <router-link to="/saleDetails">
        <mt-button size="small" type="primary">查看详情</mt-button>
      </router-link>
    </li>
    <li>
      <img src="../assets/images/icon_recharge@2x.png">
      <p class="swiper-card-num">651240.00</p>
      <p class="swiper-card-title">今日充值(元)</p>
      <router-link to="/saleDetails">
        <mt-button size="small" type="primary">查看详情</mt-button>
      </router-link>
    </li>
    <li>
      <img src="../assets/images/icon_vip@2x.png">
      <p class="swiper-card-num">20</p>
      <p class="swiper-card-title">今日新增会员</p>
      <router-link to="/saleDetails">
        <mt-button size="small" type="primary">查看详情</mt-button>
      </router-link>
    </li>
  </ul>
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
        css: ['active', 'prev', 'next', 'hide'],
        swiperAuto: true,   // 默认自动轮播是开启的
        swiperTimer: ''
      };
    },
    props: {},
    mounted: function () {
      // 页面加载完成后，开启自动轮播功能
      this.init();
    },

    methods: {
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
    watch: {}
  }
</script>

<style lang="stylus">
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
        width 88px
        height 30px
      img
        width 39px
        margin-bottom 8px

    li.active
      opacity 1
      z-index 3
      visibility visible
      transform translate3d(0, 0, 10px) scale3d(1, 1, 1)
      -webkit-transform translate3d(0, 0, 10px) scale3d(1, 1, 1)
    li.next
      opacity .7
      z-index 2
      visibility visible
      transform translate3d(46px, 0, 6px) scale3d(.8, .8, 1)
      -webkit-transform translate3d(46px, 0, 6px) scale3d(.8, .8, 1)
    li.prev
      opacity .7
      z-index 2
      visibility visible
      transform translate3d(-46px, 0, 6px) scale3d(.8, .8, 1)
      -webkit-transform translate3d(-46px, 0, 6px) scale3d(.8, .8, 1)
    li.hide
      opacity 1
      z-index 1
      -webkit-transform translate3d(0, 0, 2px) scale3d(.667, .667, 1)
      visibility visible
    .transition
      transition transform .5s ease, opacity .5s ease
      -webkit-transition -webkit-transform .5s ease, opacity .5s ease

</style>