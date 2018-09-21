<template>
  <mt-popup id="mt-popup" v-model="visible" position="right">
    <div class="popup-content">
      <mt-header title="选择门店">
        <mt-button slot="right"><img class="mt-store-close" src="../assets/images/icon_close.png" @click="closePopup">
        </mt-button>
      </mt-header>
      <Search pHolder="请输入店铺名称进行查询" :wrapperClass="wrapperClass" @updateInput="updateStoreName"/>

      <div class="store-collect" @click="selectThisShop('')">
        <p>查看门店数据汇总</p>
        <i class="mt-allow-right"></i>
      </div>

      <div class="div-store-list">
        <PageLoading v-if="shopList.loading"/>
        <NoResult v-if="!shopList.loading && shopList.noResult"/>
        <ul class="store-list" v-if="!shopList.loading && !shopList.noResult">
          <li v-for="(shop, index) in shopList.data" @click="selectThisShop(shop.FshopNo)">
            <div class="store-left">
              <span class="store-num">{{index + 1}}</span>
              <span class="store-name">{{shop.FEntityName}}</span>
            </div>
            <i class="mt-allow-right"></i>
          </li>
        </ul>
      </div>
    </div>
  </mt-popup>
</template>

<script>
  import Search from '@/components/Search.vue';
  import PageLoading from '@/components/PageLoading.vue';
  import NoResult from '@/components/NoResult.vue';


  export default {
    name: "StoreSelectPage",
    components: {Search, PageLoading, NoResult},
    data: function () {
      return {
        visible: false,
        wrapperClass: {'mt-search': true},

        shopName: '',
        shopList: {loading: false, noResult: false},
        entityId: ''
      }
    },

    mounted: function () {
      let eId = sessionStorage.getItem('entityId');
      if (!eId || eId === 'undefined') return;

      this.entityId = sessionStorage.getItem('entityId');
      this.storeVue.$on('popupStore', () => {
        this.visible = true;
      });

      this.loadStoreList();   // 加载门店列表
    },

    methods: {
      // 加载店铺列表
      loadStoreList: function () {
        this.Axios({
          method: 'post',
          url: '/stewards/myshop/selectAllShopAppData.do',
          data: this.$qs.stringify({entityId: this.entityId, shopName: this.shopName})
        }).then((res) => {
          this.shopList = {
            loading: false,
            noResult: !res.data.shopList.length,
            data: res.data.shopList
          };
        }).catch((err) => {
          console.log(err);
        });
      },

      // 关闭店铺popup
      closePopup: function () {
        this.visible = false;
      },

      // 更新店铺名称
      updateStoreName: function (name) {
        this.shopName = name;
      },

      // 选择店铺
      selectThisShop: function (id) {
        this.visible = false;
        this.storeVue.$emit('updateShopId', id);
      }
    },

    watch: {
      shopName: function () {
        this.beforeLoading(this.shopList, () => {
          this.loadStoreList();
        });
      }
    }
  }
</script>

<style lang="stylus">
  #mt-popup
    .popup-content
      height 100%
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

    .div-store-list
      overflow-y auto
      height calc(100% - 150px)

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