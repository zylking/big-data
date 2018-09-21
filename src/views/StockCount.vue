<template>
  <div class="content stock-count">
    <Header :header="header"/>

    <!-- 库存统计内容 -->
    <div class="list stock-count-list">
      <Search :pHolder="holder" :wrapperClass="wrapperClass" @updateInput="updateNameOrCode"/>

      <TypeSupplier :left="stock" :right="types" @updateTypeSupplier="updateTypeSupplier"/>

      <ul class="sales-base-info">
        <li>
          <span class="info-title">库存数量</span>
          <span class="info-num">{{stockNum}}</span>
        </li>
        <li>
          <span class="info-title">库存金额</span>
          <span class="info-num">{{stockMoney}}</span>
        </li>
      </ul>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="0">
          <PageLoading v-if="listValues.loading"/>
          <NoResult v-if="!listValues.loading && listValues.noResult"/>
          <StockCountList v-if="!listValues.loading && !listValues.noResult" :listValues="listValues.data"/>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import Search from '@/components/Search.vue';
  import TypeSupplier from '@/components/TypeSupplier.vue';
  import StockCountList from '@/components/StockCountList.vue';
  import PageLoading from '@/components/PageLoading.vue';
  import NoResult from '@/components/NoResult.vue';

  export default {
    name: "StockCount",
    components: {Header, Search, TypeSupplier, StockCountList, PageLoading, NoResult},

    data: function () {
      return {
        header: {
          back: true,
          to: '/index',
          title: '库存统计'
        },
        selected: '0',
        holder: '货品名称/编码查询',
        wrapperClass: {'mt-search': true},

        // 店铺ID和企业ID
        shopId: '',
        entityId: '',

        stockNum: 0,
        stockMoney: '0.00',
        listValues: {loading: true, noResult: false, data: []},

        // 用户输入的货品名称或者货品编码
        goodName: '',
        // 仓库
        stock: {
          id: '',                    // 当前仓库所选ID
          idKey: 'warehouseNo',      // 仓库id的key
          value: '',                 // 当前仓库所选的名称
          valueKey: 'warhousename', // 仓库value的key
          slots: [{
            flex: 1,
            values: [],
            defaultIndex: 0,
            value: ''
          }]
        },
        // 类别
        types: {
          id: '',               // 当前类别所选ID
          idKey: 'typeId',      // 类别id的key
          value: '',            // 当前类别所选的名称
          valueKey: 'typename', // 类别value的key
          slots: [{
            flex: 1,
            values: [],
            defaultIndex: 0,
            value: ''
          }]
        }
      }
    },

    mounted: function () {
      this.entityId = sessionStorage.getItem('entityId');
      this.storeVue.$on('updateShopId', (id) => {
        this.shopId = id;
      });
      // 获取仓库和类别
      this.getStockAndType();
    },

    methods: {
      // 获取仓库和类别
      getStockAndType: function () {
        this.Axios({
          method: 'post',
          url: '/stewards/storage/selectAllStockAppData.do',
          data: this.$qs.stringify({entityId: this.entityId, fShopNo: this.shopId})
        }).then((res) => {
          let
              typeList = res.data.typeList,
              dType = typeList[0],
              stockList = res.data.warehouseList,
              dStock = stockList[0];

          this.stock.id = dStock.warehouseNo;
          this.stock.value = dStock.warhousename;
          this.stock.slots[0].values = stockList;
          this.stock.slots[0].value = dStock.warhousename;

          this.types.id = dType.typeId;
          this.types.value = dType.typename;
          this.types.slots[0].values = typeList;
          this.types.slots[0].value = dType.typename;

          // 加载库存统计列表
          this.beforeLoading(this.listValues, () => {
            this.loadStockCensusList();
          });
        }).catch((err) => {
          console.log(err);
        });
      },

      // 加载库存统计列表
      loadStockCensusList: function () {
        let data = {
          start: 0,
          rows: 10,
          entityId: this.entityId,
          fShopNo: this.shopId,
          goodName: this.goodName,
          typeId: this.types.id,
          warehouseNo: this.stock.id
        };

        this.Axios({
          method: 'post',
          url: '/stewards/cdemand/getAppStockAppData.do',
          data: this.$qs.stringify(data)
        }).then((res) => {
          this.stockNum = res.data.stocknums;
          this.stockMoney = res.data.stockmoney;
          this.listValues = {
            loading: false,
            noResult: !res.data.goodsList.length,
            data: res.data.goodsList
          };
        }).catch((err) => {
          console.log(err);
        });
      },

      // 更新类型或供应商ID
      updateTypeSupplier: function (id, text, type) {
        if ((type === 'left' && this.stock.id === id) || (type === 'right' && this.types.id === id)) return;

        switch (type) {
          case 'left':
            this.stock.value = text;
            this.stock.id = id;
            break;
          case 'right':
            this.types.value = text;
            this.types.id = id;
            break;
        }

        this.beforeLoading(this.listValues, () => {
          this.loadStockCensusList();
        });
      },

      // 更新货号名称/编码
      updateNameOrCode: function (val) {
        if (this.goodName === val) return;

        this.goodName = val;
        // 加载请求列表
        this.beforeLoading(this.listValues, () => {
          this.loadStockCensusList();
        });
      }
    },

    watch: {
      shopId: function () {
        this.getStockAndType();
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
        -webkit-transform translateY(-9px) rotate(45deg)
        transform translateY(-9px) rotate(45deg)
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