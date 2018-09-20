<template>
  <div class="content sale-details">
    <Header :header="header" @updateShopId="updateShopId"/>

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
        <mt-tab-container-item id="0">
          <SaleDetailsList :listValues="listValues[selected].data"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="1">
          <SaleDetailsList :listValues="listValues[selected].data"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <SaleDetailsList :listValues="listValues[selected].data"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <SaleDetailsList :listValues="listValues[selected].data"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <SaleDetailsList :listValues="listValues[selected].data"/>
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

  export default {
    name: "SaleDetails",
    components: {Header, Navbar, Search, TypeSupplier, SaleDetailsList},
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

        // 今天、昨天、近7天、近30天的数据
        listValues: {'0': {}, '1': {}, '2': {}, '3': {}, '4': {}},
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
          url: '/api/admin/provider/getAllPrividerAppData.do',
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
          this.loadSalesDetailsList();
        }).catch((err) => {
          console.log(err);
        });
      },

      // 加载销售详情列表
      loadSalesDetailsList: function () {
        let data = {
          start: 0,
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
          url: '/api/MDsellShow/getAppSellDetailAppData.do',
          data: this.$qs.stringify(data)
        }).then((res) => {
          this.salesCount = res.data.selloutnum;
          this.salesMoney = res.data.selloutmoney;
          this.cost = res.data.cost;
          this.totalProfit = res.data.totalprofit;

          // 存储相应信息，下次切换到该tab页时，如果所选参数一致，则无需再次请求
          let sale = {type: this.types.id, supplier: this.supplier.id, input: this.goodName, data: res.data.goodsList};
          if (+this.selected === 4) {
            sale.start = this.startTime;
            sale.end = this.endTime;
          }
          this.listValues[this.selected] = sale;
        }).catch((err) => {
          console.log(err);
        });
      },

      // 更新类型或供应商ID
      updateTypeSupplier: function (id, text, type) {
        switch (type) {
          case 'left':
            if (this.types.id === id) return;

            this.types.value = text;
            this.types.id = id;
            this.loadSalesDetailsList();
            break;
          case 'right':
            if (this.supplier.id === id) return;

            this.supplier.value = text;
            this.supplier.id = id;
            this.loadSalesDetailsList();
            break;
        }
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

        let custom = this.listValues[this.selected];
        if (custom.start !== this.startTime || custom.end !== this.endTime || !custom.data) this.loadSalesDetailsList();
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
        this.loadSalesDetailsList();
      },

      // 更新店铺ID
      updateShopId: function (id) {
        this.shopId = id;
        this.loadSalesDetailsList();
      }
    },

    watch: {
      selected: function (id) {
        let tabData = this.listValues[id];

        if (+id === 4) {
          // 显示自定义时间间隔
          this.wrapperClass = {'mt-search': false, 'mt-date': true};
          // 如果不存在tabData，则表示第一次进入
          if (!tabData) {
            // 初始化时间区间为当前
            this.initTimeZones();
            this.loadSalesDetailsList();
          } else {
            // 如果已经加载过自定义的数据，则将时间区间更改成加载过的时间区间
            this.startTime = tabData.start;
            this.endTime = tabData.end;
            this.loadSalesDetailsList();
          }
        } else {
          this.wrapperClass = {'mt-search': true, 'mt-date': false};

          if (!tabData || tabData.type !== this.types.id || tabData.supplier !== this.supplier.id || tabData.input !== this.goodName || !tabData.data) {
            this.loadSalesDetailsList();
          }
        }
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