<template>
  <div id="index">
    <transition :name="transitionName">
      <router-view/>
    </transition>
    <StoreSelectPage/>
  </div>
</template>

<script>
  import StoreSelectPage from '@/components/StoreSelectPage.vue';

  export default {
    name: 'Main',
    components: {StoreSelectPage},
    data: function () {
      return {
        transitionName: ''
      }
    },

    watch: {
      $route: function (to, from) {
        if (to.meta.index > from.meta.index) {
          this.transitionName = 'slide-left';
        } else {
          this.transitionName = 'slide-right';
        }
      }

    }
  }
</script>

<style lang="stylus">
  body
    position absolute
    width 100%
    height 100%
    top 0
    color #333333

  body, ul, li, p
    font-size 14px
    margin 0
    padding 0
    list-style none

  #index
    font-family "Microsoft YaHei"
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #333333
    position relative
    width 100%
    height 100%
    overflow-x hidden
    transform-style preserve-3d
    .content
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      overflow-y auto
      transform translate3d(0, 0, 0)
      background-color rgb(245, 245, 245)

  .mint-header, #mt-popup .mint-header
    background-color #3399FF
    h1.mint-header-title
      font-size 18px
      height 20px
    .mint-button-text
      display flex
      img.mt-store-selection
        width 20px
        height 20px

  @-webkit-keyframes moveToLeft {
    to {
      -webkit-transform: translateX(-100%);
    }
  }

  @-moz-keyframes moveToLeft {
    to {
      -moz-transform: translateX(-100%);
    }
  }

  @keyframes moveToLeft {
    to {
      transform: translateX(-100%);
    }
  }

  @-webkit-keyframes moveFromLeft {
    from {
      -webkit-transform: translateX(-100%);
    }
  }

  @-moz-keyframes moveFromLeft {
    from {
      -moz-transform: translateX(-100%);
    }
  }

  @keyframes moveFromLeft {
    from {
      transform: translateX(-100%);
    }
  }

  @-webkit-keyframes moveToRight {
    to {
      -webkit-transform: translateX(100%);
    }
  }

  @-moz-keyframes moveToRight {
    to {
      -moz-transform: translateX(100%);
    }
  }

  @keyframes moveToRight {
    to {
      transform: translateX(100%);
    }
  }

  @-webkit-keyframes moveFromRight {
    from {
      -webkit-transform: translateX(100%);
    }
  }

  @-moz-keyframes moveFromRight {
    from {
      -moz-transform: translateX(100%);
    }
  }

  @keyframes moveFromRight {
    from {
      transform: translateX(100%);
    }
  }

  @-webkit-keyframes fade {
    to {
      opacity: 0.3;
    }
  }

  @-moz-keyframes fade {
    to {
      opacity: 0.3;
    }
  }

  @keyframes fade {
    to {
      opacity: 0.3;
    }
  }

  .slide-left-enter-active
    z-index 999
    animation moveFromRight .6s ease both
    -o-animation moveFromRight .6s ease both
    -moz-animation moveFromRight .6s ease both
    -webkit-animation moveFromRight .6s ease both

  .slide-right-enter-active
    z-index 999
    animation moveFromLeft .6s ease both
    -o-animation moveFromLeft .6s ease both
    -moz-animation moveFromLeft .6s ease both
    -webkit-animation moveFromLeft .6s ease both

  .slide-left-leave-active

    animation moveToLeft .6s ease both
    -o-animation moveToLeft .6s ease both
    -moz-animation moveToLeft .6s ease both
    -webkit-animation moveToLeft .6s ease both

  .slide-right-leave-active
    animation moveToRight .6s ease both
    -moz-animation moveToRight .6s ease both
    -webkit-animation moveToRight .6s ease both

  /*tab页list样式*/
  .list
    height calc(100% - 40px)
    .mint-navbar
      border-bottom 1px solid #dddddd
      .mint-tab-item
        padding 14px 0
        .mint-tab-item-label
          font-size 14px
      .mint-tab-item.is-selected
        border-bottom 2px solid #3399FF
        margin-bottom -1px

    .mint-tab-container
      margin-top 10px
      background-color #ffffff
      .mint-tab-container-wrap
        height 100%
        .mint-tab-container-item
          height 100%
          overflow-y auto
      ul.list-inner
        li
          padding 0 14px
          display flex
          justify-content space-between
          align-items center
          width calc(100% - 28px)
          height 64px
          border-bottom 1px solid #dddddd
          .list-left
            display flex
            align-items center
            width 76%
            text-align left
            .list-num
              width 50px
              color #999999
            .list-content
              display flex
              flex-direction column
              .list-title
                font-size 16px
                color #333333
              .list-intro
                color #666666
          .list-right
            color #F55957

      ul.list-inner-o
        li
          padding 10px 14px
          height 100px
          display flex
          flex-direction column
          text-align left
          justify-content space-between
          border-bottom 1px solid #dddddd
          p.list-title
            font-size 16px
            color #333333
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          p.list-intro
            color #666666

  /*修改router-link默认链接样式*/
  .custom-link
    color #333333
    text-decoration none

  /*修改mint-ui按钮样式为圆角*/
  button.mint-button
    border-radius 30px

  /*修改mint-ui primary按钮背景色*/
  button.mint-button--primary
    background-color #3399FF

  /*自定义mint-toast错误样式*/
  .mint-toast.mint-toast-error
    background-color rgba(255, 0, 0, .7)

  /*修改mint-popup默认宽度100%*/
  .mint-popup
    width 100%

  /*自定义箭头样式*/
  .mt-allow-right
    display inline-block
    margin-left 8px
    width 5px
    height 5px
    border 2px solid #979797
    border-bottom-width 0
    border-left-width 0
    -webkit-transform translateY(-24%) rotate(45deg)
    -moz-transform translateY(-24%) rotate(45deg)
    -ms-transform translateY(-24%) rotate(45deg)
    -o-transform translateY(-24%) rotate(45deg)
    transform translateY(-24%) rotate(45deg)

  /*message box 字体样式*/
  .mint-msgbox
    .mint-msgbox-btn
      font-size 16px

  /*加载状态样式*/
  .mint-spinner-double-bounce
    display inline-block

  /*自定义滚动加载状态样式*/
  #mt-infinite-loading
    width 100%
    flex-direction row
    justify-content center
    align-items center
    height 50px
    padding 0
    background-color #f5f5f5
    border-bottom 0
    p
      font-size 12px
      margin-left 8px
      color #999999
      transform translateY(-3px)
</style>
