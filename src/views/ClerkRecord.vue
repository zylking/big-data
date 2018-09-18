<template>
  <div class="content clerk-record">
    <mt-header class="mt-header" title="店员业绩">
      <router-link to="/index" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <!-- 店员业绩内容 -->
    <div class="list clerk-list">
      <mt-navbar v-model="selected">
        <mt-tab-item id="0">今天</mt-tab-item>
        <mt-tab-item id="1">昨天</mt-tab-item>
        <mt-tab-item id="2">近7天</mt-tab-item>
        <mt-tab-item id="3">近30天</mt-tab-item>
        <mt-tab-item id="-1">自定义</mt-tab-item>
      </mt-navbar>

      <Search :pHolder="holder" :wrapperClass="wrapperClass"/>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="0">
          <ul class="list-inner clerk-list-inner">
            <li>
              <div class="list-left">
                <div class="list-num">1</div>
                <div class="list-content">
                  <span class="list-title">周新雨</span>
                  <span class="list-intro">城西银泰店</span>
                </div>
              </div>
              <div class="list-right">2000.00</div>
            </li>
            <li>
              <div class="list-left">
                <div class="list-num">2</div>
                <div class="list-content">
                  <span class="list-title">刘丽</span>
                  <span class="list-intro">城西银泰店</span>
                </div>
              </div>
              <div class="list-right">2000.00</div>
            </li>
            <li>
              <div class="list-left">
                <div class="list-num">3</div>
                <div class="list-content">
                  <span class="list-title">张三</span>
                  <span class="list-intro">城西银泰店</span>
                </div>
              </div>
              <div class="list-right">2000.00</div>
            </li>
            <li>
              <div class="list-left">
                <div class="list-num">4</div>
                <div class="list-content">
                  <span class="list-title">赵四</span>
                  <span class="list-intro">城西银泰店</span>
                </div>
              </div>
              <div class="list-right">2000.00</div>
            </li>
            <li>
              <div class="list-left">
                <div class="list-num">5</div>
                <div class="list-content">
                  <span class="list-title">雷涛</span>
                  <span class="list-intro">城西银泰店</span>
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
  import Search from '@/components/Search.vue'

  export default {
    name: "ClerkRecord",
    components: {
      Search
    },
    data: function () {
      return {
        holder: "店员姓名",
        selected: '0',
        wrapperClass: {'mt-search': true, 'mt-date': false}
      }
    },

    mounted: function () {
      this.loadList();
    },

    watch: {
      selected: function (id) {
        if (+id === -1) {
          // 显示自定义时间间隔
          this.wrapperClass = {'mt-search': false, 'mt-date': true}
        } else {
          this.wrapperClass = {'mt-search': true, 'mt-date': false}
        }
      }
    },

    methods: {
      // 加载店员业绩列表
      loadList: function () {
        this.Axios({
          method: 'post',
          url: 'Salesanaly/selectByEmpMoney.do',
          data: {entityId: 145, fShopNo: 365}
        }).then(function (res) {
          console.log('res：', res.data);
        }).catch(function (err) {
          console.log(err);
        });
      }
    }
  }
</script>

<style lang="stylus">

</style>