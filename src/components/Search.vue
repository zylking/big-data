<template>
  <div class="mt-cell-wrapper" :class="wrapperClass">
    <mt-search cancel-text="取消" :placeholder="pHolder"></mt-search>
    <div class="mt-custom-date">
      <div class="mt-custom-date mt-date-start" @click="openPicker(startDate, 'start')">{{startDate}}</div>
      <span class="mt-split">-</span>
      <div class="mt-custom-date mt-date-end" @click="openPicker(endDate, 'end')">{{endDate}}</div>
    </div>

    <mt-datetime-picker ref="picker" type="date" v-model="pickerDate" year-format="{value}年" month-format="{value}月"
                        date-format="{value}日"
                        @confirm="confirmDate"></mt-datetime-picker>
  </div>
</template>

<script>
  export default {
    name: "Search",

    props: {
      pHolder: String,
      wrapperClass: Object
    },

    data: function () {
      return {
        startDate: this.getNowFormatDate(),
        endDate: this.getNowFormatDate(),
        pickerType: 'start',
        pickerDate: new Date()
      };
    },

    methods: {
      openPicker: function (strDate, type) {
        this.pickerType = type;
        this.pickerDate = new Date(strDate);
        this.$refs.picker.open();
      },

      confirmDate: function (str) {
        let mesc = new Date(str).getTime();
        switch (this.pickerType) {
          case 'start':
            let endMesc = new Date(this.endDate).getTime();
            // 如果开始日期大于结束时间，则提示日期选择错误
            if (mesc > endMesc) {
              this.Toast({message: '日期选择错误', className: 'mint-toast-error'});
            } else {
              this.startDate = this.getNowFormatDate(str);
            }
            break;
          case 'end':
            let startMesc = new Date(this.startDate).getTime();
            // 如果结束日期小于开始时间，则提示日期选择错误
            if (mesc < startMesc) {
              this.Toast({message: '日期选择错误', className: 'mint-toast-error'});
            } else {
              this.endDate = this.getNowFormatDate(str);
            }
            break;
        }
      }
    }
  }
</script>

<style lang="stylus">
  .mt-cell-wrapper
    .mint-search
      display none
      height 52px
      .mint-searchbar
        background-color #ffffff
        .mint-searchbar-inner
          position relative
          i.mintui-search
            position absolute
            top 7px
            left 12px
            font-size 20px
            color #979797
          input.mint-searchbar-core
            padding-left 30px
            border-radius 28px
            background-color #F3F3F3
    .mt-custom-date
      display none
      justify-content center
      width 100%
      height 52px
      font-size 15px
      align-items center
      background-color #ffffff
      .mt-split
        font-size 18px

  .mt-cell-wrapper.mt-search
    .mint-search
      display block
    .mt-custom-date
      display none

  .mt-cell-wrapper.mt-date
    .mint-search
      display none
    .mt-custom-date
      display flex
</style>