<template>
  <div class="content sale-details">
    <Header :header="header"/>

    <!-- 销售详情内容 -->
    <div class="list sales-details-list">
      <Navbar @updateSelected="updateSelected" @updateTime="updateTime"/>
      <Search :pHolder="holder" :wrapperClass="wrapperClass" @updateInput="updateNameOrCode"
              @updateCustom="updateCustom"/>

      <TypeSupplier :left="types" :right="supplier" @updateTypeSupplier="updateTypeSupplier"/>

      <ul class="sales-base-info">
        <li>
          <span class="info-title">销售数量</span>
          <span class="info-num">{{salesCount}}</span>
        </li>
        <li>
          <span class="info-title">销售金额</span>
          <span class="info-num">{{salesMoney}}</span>
        </li>
        <li>
          <span class="info-title">成本总额</span>
          <span class="info-num">{{cost}}</span>
        </li>
        <li>
          <span class="info-title">总利润</span>
          <span class="info-num">{{totalProfit}}</span>
        </li>
      </ul>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item v-for="(item, key) in values" :id="key">
          <PageLoading v-if="item.loading"/>
          <NoResult v-if="!item.loading && item.noResult"/>
          <SaleDetailsList v-if="!item.loading && !item.noResult" :listValues="item" @loadMoreList="loadMoreList"/>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import Navbar from '@/components/Navbar.vue';
  import Search from '@/components/Search.vue';
  import TypeSupplier from '@/components/TypeSupplier.vue';
  import SaleDetailsList from '@/components/SaleDetailsList.vue';
  import PageLoading from '@/components/PageLoading.vue';
  import NoResult from '@/components/NoResult.vue';

  export default {
    name: "SaleDetails",
    components: {Header, Navbar, Search, TypeSupplier, SaleDetailsList, PageLoading, NoResult},
    data: function () {
      return {
        header: {
          back: true,
          to: '/index',
          title: '销售详情'
        },

        selected: '0',
        typeVisible: false,
        supplierVisible: false,
        holder: '货品名称/编码查询',
        wrapperClass: {'mt-search': true, 'mt-date': false},
        salesCount: 0,
        salesMoney: '0.00',
        cost: '0.00',
        totalProfit: '0.00',

        // 店铺id
        shopId: '',
        // 企业id
        entityId: '',

        /**
         * 今天、昨天、近7天、近30天的数据
         * start 各标签页当前的数据其实页 0：第一页
         * noMore false表示已没有更多数据
         * loading true表示显示加载状态
         * noResult false表示没有请求到数据结果
         */
        values: {
          '0': {start: 0, noMore: false, loading: true, noResult: false},
          '1': {start: 0, noMore: false},
          '2': {start: 0, noMore: false},
          '3': {start: 0, noMore: false},
          '4': {start: 0, noMore: false}
        },
        // 用户输入的货品名称或者货品编码
        goodName: '',
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
        },
        // 供应商
        supplier: {
          id: '',                    // 当前供应商所选ID
          idKey: 'fproviderno',      // 供应商id的key
          value: '',                 // 当前供应商所选的名称
          valueKey: 'fprovidername', // 供应商value的key
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

      // 初始化
      this.initTimeZones();
      // 加载类别、供应商
      this.loadTypeAndSupplier();
    },

    methods: {
      // 初始化
      initTimeZones: function () {
        let now = this.getNowFormatDate();
        this.startTime = now + ' 00:00:00';
        this.endTime = now + ' 23:59:59';
      },

      // 加载类别、供应商
      loadTypeAndSupplier: function () {
        this.Axios({
          method: 'post',
          url: '/stewards/admin/provider/getAllPrividerAppData.do',
          data: this.$qs.stringify({entityId: this.entityId})
        }).then((res) => {
          let
              typeList = res.data.typeList,
              dtList = typeList[0],
              supplierList = res.data.supplierList,
              dsList = supplierList[0];

          this.types.id = dtList.typeId;
          this.types.value = dtList.typename;
          this.types.slots[0].values = typeList;
          this.types.slots[0].value = dtList.typename;

          this.supplier.id = dsList.fproviderno;
          this.supplier.value = dsList.fprovidername;
          this.supplier.slots[0].values = supplierList;
          this.supplier.slots[0].value = dsList.fprovidername;

          // 加载销售详情列表
          this.beforeLoading(this.values[this.selected], () => {
            this.loadSalesDetailsList();
          });
        }).catch((err) => {
          console.log(err);
        });
      },

      // 加载销售详情列表
      loadSalesDetailsList: function (callback) {
        let
            current = this.values[this.selected],
            data = {
              start: current.start,
              rows: 10,
              entityId: this.entityId,
              fShopNo: this.shopId,
              goodName: this.goodName,
              typeId: this.types.id,
              supplierid: this.supplier.id,
              startTime: this.startTime,
              endTime: this.endTime
            };

        this.Axios({
          method: 'post',
          url: '/stewards/MDsellShow/getAppSellDetailAppData.do',
          data: this.$qs.stringify(data)
        }).then((res) => {
          let result = res.data, goodsList = result.goodsList;

          // 基本信息
          this.salesCount = result.selloutnum;
          this.salesMoney = result.selloutmoney;
          this.cost = result.cost;
          this.totalProfit = result.totalprofit;

          // 存储相应信息，下次切换到该tab页时，如果所选参数一致，则无需再次请求
          let sale = {
            start: current.start + 1,
            noMore: goodsList === 10,
            loading: false,
            noResult: current.start === 0 && !goodsList.length,   // 第一页，且返回的结果为0则表示该tab页是空的
            type: this.types.id,
            supplier: this.supplier.id,
            input: this.goodName,
            data: current.data ? goodsList : current.data.concat(goodsList)
          };

          if (+this.selected === 4) {
            sale.startTime = this.startTime;
            sale.endTime = this.endTime;
          }
          this.values[this.selected] = sale;

          // 触发滚动加载的回调
          callback && callback();
        }).catch((err) => {
          console.log(err);
        });
      },

      // 更新类型或供应商ID
      updateTypeSupplier: function (id, text, type) {
        if ((type === 'left' && this.types.id === id) || (type === 'right' && this.supplier.id === id)) return;

        switch (type) {
          case 'left':
            this.types.value = text;
            this.types.id = id;
            break;
          case 'right':
            this.supplier.value = text;
            this.supplier.id = id;
            break;
        }

        // 加载销售详情列表
        this.beforeLoading(this.values[this.selected], () => {
          this.loadSalesDetailsList();
        });
      },

      // tab页切换更改时间
      updateTime: function (start, end) {
        this.startTime = start;
        this.endTime = end;
      },

      // 更新自定义：时间区间和列表请求
      updateCustom: function (start, end) {
        this.startTime = start;
        this.endTime = end;

        let custom = this.values[this.selected];
        if (custom.startTime !== this.startTime || custom.endTime !== this.endTime || !custom.data) {
          this.beforeLoading(this.values[this.selected], () => {
            this.loadSalesDetailsList();
          });
        }
      },

      // 更改tab页选择状态
      updateSelected: function (id) {
        this.selected = id;
      },

      // 更新货号名称/编码
      updateNameOrCode: function (val) {
        if (this.goodName === val) return;

        this.goodName = val;
        // 加载请求列表
        this.beforeLoading(this.values[this.selected], () => {
          this.loadSalesDetailsList();
        });
      },

      // 加载更多列
      loadMoreList: function (callback) {
        this.loadSalesDetailsList(callback);
      }
    },

    watch: {
      selected: function (id) {
        this.wrapperClass = {'mt-search': +id !== 4, 'mt-date': +id === 4};
        let tabData = this.values[id];

        // 没有数据、或者分类ID不同、或者供应商ID不同、或者与上次输入的商品名称不同，则在切换时，重新加载数据
        if (!tabData.data || tabData.type !== this.types.id || tabData.supplier !== this.supplier.id || tabData.input !== this.goodName) {
          // 如果是切换自定义时间，则当前时间区间为自定义显示的区间
          if (+id === 4) {
            if (!tabData.startTime && tabData.endTime) {
              this.initTimeZones();
            } else {
              this.startTime = tabData.startTime;
              this.endTime = tabData.endTime;
            }
          }

          this.beforeLoading(this.values[this.selected], () => {
            this.loadSalesDetailsList();
          });
        }
      },

      shopId: function () {
        this.beforeLoading(this.values[this.selected], () => {
          this.loadSalesDetailsList();
        });
      }
    }
  }
</script>

<style lang="stylus">
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

  .list
    .mint-tab-container
      height calc(100% - 212px)
</style>