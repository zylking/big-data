<template>
  <div class="content store-record">
    <Header :header="header"/>
    <!--<mt-header class="mt-header" :title="title">-->
    <!--<router-link to="/index" slot="left">-->
    <!--<mt-button icon="back"></mt-button>-->
    <!--</router-link>-->
    <!--<mt-button slot="right"><img class="mt-store-selection" src="../assets/images/icon_store_selection@2x.png"></mt-button>-->
    <!--</mt-header>-->

    <!-- 店铺业绩内容 -->
    <div class="list store-record">
      <Navbar @updateSelected="updateSelected" @updateTime="updateTime"/>
      <Search :wrapperClass="wrapperClass" @updateCustom="updateCustom"/>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="0">
          <ul class="list-inner store-list-inner">
            <li>
              <div class="list-left">
                <div class="list-num">1</div>
                <div class="list-content">
                  <span class="list-title">城西银泰店</span>
                </div>
              </div>
              <div class="list-right">2000.00</div>
            </li>
            <li>
              <div class="list-left">
                <div class="list-num">2</div>
                <div class="list-content">
                  <span class="list-title">城西银泰店</span>
                </div>
              </div>
              <div class="list-right">2000.00</div>
            </li>
            <li>
              <div class="list-left">
                <div class="list-num">3</div>
                <div class="list-content">
                  <span class="list-title">城西银泰店</span>
                </div>
              </div>
              <div class="list-right">2000.00</div>
            </li>
            <li>
              <div class="list-left">
                <div class="list-num">4</div>
                <div class="list-content">
                  <span class="list-title">城西银泰店</span>
                </div>
              </div>
              <div class="list-right">2000.00</div>
            </li>
            <li>
              <div class="list-left">
                <div class="list-num">5</div>
                <div class="list-content">
                  <span class="list-title">城西银泰店</span>
                </div>
              </div>
              <div class="list-right">2000.00</div>
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="1">
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
        </mt-tab-container-item>
        <mt-tab-container-item id="-1">
          <!--<mt-cell v-for="n in 6" :title="'选项 ' + n"/>-->
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import Navbar from '@/components/Navbar.vue'
  import Search from '@/components/Search.vue'

  export default {
    name: "StoreRecord",
    components: {Header, Navbar, Search},

    data: function () {
      return {
        header: {
          back: true,
          to: '/index',
          title: "店铺业绩"
        },
        selected: '0',
        wrapperClass: {'mt-date': false}
      }
    },

    methods: {
      // 更新自定义：时间区间和列表请求
      updateCustom: function (start, end) {
        this.startTime = start;
        this.endTime = end;

        // let custom = this.listValues[this.selected];
        // if (custom.start !== this.startTime || custom.end !== this.endTime || !custom.data) this.loadSalesDetailsList();
      },

      // 更改tab页选择状态
      updateSelected: function (id) {
        this.selected = id;
      },

      // tab页切换更改时间
      updateTime: function (start, end) {
        this.startTime = start;
        this.endTime = end;
      },
    },

    watch: {
      selected: function (id) {
        if (+id === 4) {
          // 显示自定义时间间隔
          this.wrapperClass = {'mt-date': true}
        } else {
          this.wrapperClass = {'mt-date': false}
        }
      }
    }
  }
</script>

<style lang="stylus">
</style>