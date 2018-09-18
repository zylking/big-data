<template>
  <div :class="list">
    <mt-navbar v-model="selected">
      <mt-tab-item id="0">今天</mt-tab-item>
      <mt-tab-item id="1">昨天</mt-tab-item>
      <mt-tab-item id="2">近7天</mt-tab-item>
      <mt-tab-item id="3">近30天</mt-tab-item>
      <mt-tab-item id="-1">自定义</mt-tab-item>
    </mt-navbar>

    <Search :pHolder="pHolder"/>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="0">
        <ul :class="inner">
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
</template>

<script>
  import Search from '@/components/Search.vue'

  export default {
    name: "Navbar",
    props: {
      list: String,
      pHolder: String,
      inner: String
    },
    components: {
      Search
    }
  }
</script>

<style lang="stylus">



</style>