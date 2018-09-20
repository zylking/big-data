<template>
  <mt-navbar v-model="selected">
    <mt-tab-item id="0">今天</mt-tab-item>
    <mt-tab-item id="1">昨天</mt-tab-item>
    <mt-tab-item id="2">近7天</mt-tab-item>
    <mt-tab-item id="3">近30天</mt-tab-item>
    <mt-tab-item id="4">自定义</mt-tab-item>
  </mt-navbar>
</template>

<script>
  export default {
    name: "Navbar",
    data: function () {
      return {
        selected: '0',
        start: '',
        end: ''
      }
    },

    methods: {
      // 获取切换tab的日期区间
      getNavbarDate: function (id) {
        let now = this.getNowFormatDate();

        switch (+id) {
          case 0:
            // 今天
            this.start = now + ' 00:00:00';
            this.end = now + ' 23:59:59';
            break;
          case 1:
            // 昨天
            let yesterday = this.getNowFormatDate('', -1);
            this.start = yesterday + ' 00:00:00';
            this.end = yesterday + ' 23:59:59';
            break;
          case 2:
            // 近7天
            let week = this.getNowFormatDate('', -7);
            this.start = week + ' 00:00:00';
            this.end = now + ' 23:59:59';
            break;
          case 3:
            // 近30天
            let month = this.getNowFormatDate('', -30);
            this.start = month + ' 00:00:00';
            this.end = now + ' 23:59:59';
            break;
        }
      }
    },

    watch: {
      selected: function (id) {
        // 非自定义，触发更改父组件起始时间
        if (+id !== 4) {
          this.getNavbarDate(id);
          // 更新时间
          this.$emit('updateTime', this.start, this.end);
        }

        this.$emit('updateSelected', '' + id);
      }
    }
  }
</script>

<style lang="stylus">


</style>