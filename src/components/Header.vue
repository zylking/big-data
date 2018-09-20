<template>
  <div class="header">
    <mt-header :title="header.title">
      <router-link v-if="header.back" :to="header.to" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="" slot="right">
        <img class="mt-store-selection" src="../assets/images/icon_store_selection@2x.png" @click="popupStoreSelection">
      </mt-button>
    </mt-header>

    <mt-popup id="mt-popup" v-model="visible" position="right">
      <div class="popup-content">
        <mt-header title="选择门店">
          <mt-button slot="right"><img class="mt-store-close" src="../assets/images/icon_close.png" @click="closePopup">
          </mt-button>
        </mt-header>
        <Search pHolder="请输入店铺名称进行查询" :wrapperClass="wrapperClass" @updateInput="updateStoreName"/>

        <div class="store-collect">
          <p>查看门店数据汇总</p>
          <i class="mt-allow-right"></i>
        </div>

        <ul class="store-list">
          <li v-for="(shop, index) in shopList" @click="selectThisShop(shop.FshopNo)">
            <div class="store-left">
              <span class="store-num">{{index + 1}}</span>
              <span class="store-name">{{shop.FEntityName}}</span>
            </div>
            <i class="mt-allow-right"></i>
          </li>
        </ul>
      </div>
    </mt-popup>
  </div>

</template>

<script>
  import Search from '@/components/Search.vue';

  export default {
    name: "Header",
    components: {Search},
    props: {header: Object},

    data: function () {
      return {
        visible: false,
        pHolder: '',
        wrapperClass: {'mt-search': true},

        shopName: '',
        shopList: []
      }
    },

    mounted: function () {
      if (!this.isSessionEntityId()) return;

      // 加载门店列表
      this.loadStoreList();
    },

    methods: {
      // 加载店铺列表
      loadStoreList: function () {
        this.Axios({
          method: 'post',
          url: '/api/myshop/selectAllShopAppData.do',
          data: this.$qs.stringify({entityId: this.header.entityId, shopName: this.shopName})
        }).then((res) => {
          this.shopList = res.data.shopList;
        }).catch((err) => {
          console.log(err);
        });
      },

      // 弹出选择店铺的popup
      popupStoreSelection: function () {
        if (!this.isSessionEntityId()) return this.showMessage('请先登录！');

        this.visible = true;
      },

      // 关闭popup
      closePopup: function () {
        this.visible = false;
      },

      // 更新
      updateStoreName: function (name) {

      },

      // 选择店铺
      selectThisShop: function (id) {
        this.visible = false;
        this.$emit('updateShopId', id);
      },

      isSessionEntityId: function () {
        let eId = sessionStorage.getItem('entityId');
        return eId && eId !== 'undefined';
      }
    }
  }
</script>

<style lang="stylus">
  #mt-popup
    .mint-button-text
      display flex
      .mt-store-close
        width 16px
        height 16px

    i.mt-allow-right
      -webkit-transform translateY(3px) rotate(45deg)
      -moz-transform translateY(3px) rotate(45deg)
      -ms-transform translateY(3px) rotate(45deg)
      -o-transform translateY(3px) rotate(45deg)
      transform translateY(3px) rotate(45deg)

    .store-collect
      padding 0 14px
      display flex
      align-items center
      justify-content space-between
      color #3399FF
      height 56px
      border 1px solid #dddddd
      border-right 0
      border-left 0
      p
        font-size 16px

    .store-list
      li
        padding 0 14px
        display flex
        font-size 16px
        justify-content space-between
        align-items center
        height 56px
        border-bottom 1px solid #dddddd
        .store-left
          text-align left
          width calc(100% - 20px)
          span.store-num
            display inline-block
            color #999999
            width 50px
            transform translateY(2px)
          .store-name
            display inline-block
            width calc(100% - 50px)
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            transform translateY(2px)

  .mint-popup-right
    height 100%
</style>