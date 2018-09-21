<template>
  <div class="content clerk-record">
    <Header :header="header"/>

    <!-- 店员业绩内容 -->
    <div class="list clerk-list">
      <Navbar @updateSelected="updateSelected" @updateTime="updateTime"/>
      <Search :pHolder="holder" :wrapperClass="wrapperClass" @updateInput="updateEmpName" @updateCustom="updateCustom"/>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="0">
          <PageLoading v-if="values[0].loading"/>
          <NoResult v-if="!values[0].loading && values[0].noResult"/>
          <ClerkRecordList v-if="!values[0].loading && !values[0].noResult" :recordValues="values[1]['data']"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="1">
          <PageLoading v-if="values[1].loading"/>
          <NoResult v-if="!values[1].loading && values[0].noResult"/>
          <ClerkRecordList v-if="!values[1].loading && !values[1].noResult" :recordValues="values[1]['data']"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <PageLoading v-if="values[2].loading"/>
          <NoResult v-if="!values[2].loading && values[0].noResult"/>
          <ClerkRecordList v-if="!values[2].loading && !values[2].noResult" :recordValues="values[1]['data']"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <PageLoading v-if="values[3].loading"/>
          <NoResult v-if="!values[3].loading && values[0].noResult"/>
          <ClerkRecordList v-if="!values[3].loading && !values[3].noResult" :recordValues="values[1]['data']"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <PageLoading v-if="values[4].loading"/>
          <NoResult v-if="!values[4].loading && values[0].noResult"/>
          <ClerkRecordList v-if="!values[4].loading && !values[4].noResult" :recordValues="values[1]['data']"/>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import Navbar from '@/components/Navbar.vue';
  import Search from '@/components/Search.vue';
  import ClerkRecordList from '@/components/ClerkRecordList.vue';
  import PageLoading from '@/components/PageLoading.vue';
  import NoResult from '@/components/NoResult.vue';

  export default {
    name: "ClerkRecord",
    components: {Header, Navbar, Search, ClerkRecordList, PageLoading, NoResult},
    data: function () {
      return {
        header: {
          back: true,
          to: '/index',
          title: '店员业绩'
        },
        holder: "店员姓名",
        selected: '0',
        wrapperClass: {'mt-search': true, 'mt-date': false},

        shopId: '',
        entityId: '',
        // 输入框输入的店员名称
        empName: '',

        // 今天、昨天、近7天、近30天、自定义时间区间的数据
        values: {'0': {loading: true, noResult: false}, '1': {}, '2': {}, '3': {}, '4': {}},
      }
    },

    mounted: function () {
      this.entityId = sessionStorage.getItem('entityId');
      this.storeVue.$on('updateShopId', (id) => {
        this.shopId = id;
      });
      // 初始化
      this.initTimeZones();
      // 加载列表
      this.beforeLoading(this.values[this.selected], () => {
        this.loadClerkRecordList();
      });
    },

    methods: {
      // 初始化
      initTimeZones: function () {
        let now = this.getNowFormatDate();
        this.startTime = now + ' 00:00:00';
        this.endTime = now + ' 23:59:59';
      },

      // 加载店员业绩列表
      loadClerkRecordList: function () {
        let data = {
          start: 0,
          rows: 10,
          entityId: this.entityId,
          fShopNo: this.shopId,
          empName: this.empName,
          startTime: this.startTime,
          endTime: this.endTime
        };

        this.Axios({
          method: 'post',
          url: '/stewards/Salesanaly/selectByEmpMoneyAppData.do',
          data: this.$qs.stringify(data)
        }).then((res) => {
          this.values[this.selected] = {
            loading: false,
            noResult: !res.data.empList.length,
            empName: this.empName,
            data: res.data.empList
          };
          if (this.selected === '4') {
            this.values[this.selected].start = this.startTime;
            this.values[this.selected].end = this.endTime;
          }
        }).catch(function (err) {
          console.log(err);
        });
      },

      // 更新输入的店员名称
      updateEmpName: function (name) {
        if (this.empName === name) return;

        this.empName = name;
        this.beforeLoading(this.values[this.selected], () => {
          this.loadClerkRecordList();
        });
      },

      // tab页切换更改时间
      updateTime: function (start, end) {
        this.startTime = start;
        this.endTime = end;
      },

      // 更新自定义：时间区间和列表请求
      updateCustom: function (start, end) {
        let custom = this.values[this.selected];
        if (custom.start !== start || custom.end !== end) {
          this.startTime = start;
          this.endTime = end;
          this.beforeLoading(this.values[this.selected], () => {
            this.loadClerkRecordList();
          });
        }
      },

      // 更改tab页选择状态
      updateSelected: function (id) {
        this.selected = id;
      }
    },

    watch: {
      selected: function (id) {
        this.wrapperClass = {'mt-search': +id !== 4, 'mt-date': +id === 4};

        let values = this.values[id];

        if (!values.data || values.empName !== this.emphasis) {
          if (+id === 4) {
            if (!values.start && !values.end) {
              this.initTimeZones();
            } else {
              this.startTime = values.start;
              this.endTime = values.end;
            }
          }

          this.beforeLoading(this.values[this.selected], () => {
            this.loadClerkRecordList();
          });
        }
      },

      shopId: function () {
        this.beforeLoading(this.values[this.selected], () => {
          this.loadClerkRecordList();
        });
      }
    }
  }
</script>

<style lang="stylus">
  .clerk-list
    height calc(100% - 40px)
    .mint-tab-container
      min-height calc(100% - 106px)
</style>