<template>
  <div class="content clerk-record">
    <Header :header="header" @updateShopId="updateShopId"/>

    <!-- 店员业绩内容 -->
    <div class="list clerk-list">
      <Navbar @updateSelected="updateSelected" @updateTime="updateTime"/>
      <Search :pHolder="holder" :wrapperClass="wrapperClass" @updateInput="updateEmpName" @updateCustom="updateCustom"/>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="0">
          <ClerkRecordList :recordValues="recordValues[selected]['data']"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="1">
          <ClerkRecordList :recordValues="recordValues[selected]['data']"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <ClerkRecordList :recordValues="recordValues[selected]['data']"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <ClerkRecordList :recordValues="recordValues[selected]['data']"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <ClerkRecordList :recordValues="recordValues[selected]['data']"/>
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

  export default {
    name: "ClerkRecord",
    components: {Header, Navbar, Search, ClerkRecordList},
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
        recordValues: {'0': {}, '1': {}, '2': {}, '3': {}, '4': {}},
      }
    },

    mounted: function () {
      this.entityId = sessionStorage.getItem('entityId');
      // 初始化
      this.initTimeZones();
      // 加载列表
      this.loadClerkRecordList();
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
          this.recordValues[this.selected] = {empName: this.empName, data: res.data.empList};
          if (this.selected === '4') {
            this.recordValues[this.selected].start = this.startTime;
            this.recordValues[this.selected].end = this.endTime;
          }
        }).catch(function (err) {
          console.log(err);
        });
      },

      // 更新输入的店员名称
      updateEmpName: function (name) {
        if (this.empName === name) return;

        this.empName = name;
        this.loadClerkRecordList();
      },

      // tab页切换更改时间
      updateTime: function (start, end) {
        this.startTime = start;
        this.endTime = end;
      },

      // 更新自定义：时间区间和列表请求
      updateCustom: function (start, end) {
        let custom = this.recordValues[this.selected];
        if (custom.start !== start || custom.end !== end) {
          this.startTime = start;
          this.endTime = end;

          this.loadClerkRecordList();
        }
      },

      // 更改tab页选择状态
      updateSelected: function (id) {
        this.selected = id;
      },

      // 更新店铺ID
      updateShopId: function (id) {
        this.shopId = id;
        this.loadClerkRecordList();
      }
    },

    watch: {
      selected: function (id) {
        let values = this.recordValues[id];
        if (+id === 4) {
          // 显示自定义时间间隔
          this.wrapperClass = {'mt-search': false, 'mt-date': true};
          // 如果没有加载过自定义区间的数据， 则重新初始化时间为当前时间，然后加载
          if ((!values.start && !values.end) || values.empName !== this.empName) {
            this.initTimeZones();
            this.loadClerkRecordList();
          }
        } else {
          this.wrapperClass = {'mt-search': true, 'mt-date': false};
          // 判断切换时，如果
          if (values.empName !== this.empName) this.loadClerkRecordList();
        }
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