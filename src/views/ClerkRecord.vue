<template>
  <div class="content clerk-record">
    <Header :header="header"/>

    <!-- 店员业绩内容 -->
    <div class="list clerk-list">
      <Navbar @updateSelected="updateSelected" @updateTime="updateTime"/>
      <Search :pHolder="holder" :wrapperClass="wrapperClass" @updateInput="updateEmpName" @updateCustom="updateCustom"/>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item v-for="(item, key) in values" :id="key">
          <PageLoading v-if="item.loading"/>
          <NoResult v-if="!item.loading && item.noResult"/>
          <ClerkRecordList v-if="!item.loading && !item.noResult" :recordValues="item" @loadMoreList="loadMoreList"/>
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
        values: {
          '0': {start: 0, noMore: false, loading: true, noResult: false},
          '1': {start: 0, noMore: false},
          '2': {start: 0, noMore: false},
          '3': {start: 0, noMore: false},
          '4': {start: 0, noMore: false}
        },
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
      loadClerkRecordList: function (callback) {
        let
            start = this.values[this.selected].start,
            data = {
              start: start,
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
          let result = res.data, empList = result.empList;

          this.values[this.selected] = {
            start: start + 1,
            noMore: empList.length === 10,
            loading: true,
            noResult: start === 0 && !empList.length,
            empName: this.empName,
            data: empList
          };
          if (this.selected === '4') {
            this.values[this.selected].startTime = this.startTime;
            this.values[this.selected].endTime = this.endTime;
          }

          callback && callback();
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
        if (custom.startTime !== start || custom.endTime !== end) {
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
      },

      // 加载更多列
      loadMoreList: function (callback) {
        this.loadClerkRecordList(callback);
      }
    },

    watch: {
      selected: function (id) {
        let value = this.values[id];
        this.wrapperClass = {'mt-search': +id !== 4, 'mt-date': +id === 4};

        if (!value.data || value.empName !== this.emphasis) {
          if (+id === 4) {
            if (!value.startTime && !value.endTime) {
              this.initTimeZones();
            } else {
              this.startTime = value.startTime;
              this.endTime = value.endTime;
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
  .list
    .mint-tab-container
      height calc(100% - 106px)
</style>