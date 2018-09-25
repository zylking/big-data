<template>
  <div class="mt-cell-wrapper" :class="wrapperClass">
    <div :class="searchClass">
      <div class="mt-custom-searchbar">
        <div class="mt-custom-search-inner">
          <i class="mintui mintui-search"></i>
          <input class="mint-searchbar-core" ref="input" :placeholder="pHolder" @focus="inputFocus"/>
        </div>
        <mt-button size="small" type="primary" class="mt-confirm" @click="confirmInput">确认</mt-button>
        <mt-button size="small" type="default" class="mt-cancel" @click="cancelInput">取消</mt-button>
      </div>
    </div>
    <div class="mt-custom-date">
      <div class="mt-custom-date mt-date-start" @click="openPicker(startDate, 'start')">{{startDate}}</div>
      <span class="mt-split">-</span>
      <div class="mt-custom-date mt-date-end" @click="openPicker(endDate, 'end')">{{endDate}}</div>
    </div>

    <mt-datetime-picker ref="picker" type="date" v-model="pickerDate" year-format="{value}" month-format="{value}"
                        date-format="{value}"
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
        pickerDate: new Date(),
        searchClass: {'mt-custom-search': true, 'search-focus': false}
      };
    },

    methods: {
      // 聚焦输入框
      inputFocus: function () {
        this.searchClass = {'mt-custom-search': true, 'search-focus': true};
      },

      // 确认输入
      confirmInput: function () {
        this.$emit('updateInput', this.$refs.input.value);
        this.searchClass = {'mt-custom-search': true, 'search-focus': false};
      },

      // 取消输入
      cancelInput: function () {
        // 清空当前输入框输入
        this.$refs.input.value = '';
        this.$emit('updateInput', '');
        this.searchClass = {'mt-custom-search': true, 'search-focus': false};
      },

      openPicker: function (strDate, type) {
        this.pickerType = type;
        this.pickerDate = new Date(strDate);
        this.$refs.picker.open();
      },

      confirmDate: function (str) {
        let
            format = this.getNowFormatDate(str),
            mesc = new Date(format + " 00:00:00").getTime();

        switch (this.pickerType) {
          case 'start':
            let endMesc = new Date(this.endDate + " 23:59:59").getTime();
            // 如果开始日期大于结束时间，则提示日期选择错误
            if (mesc > endMesc) {
              this.Toast({message: '日期选择错误', className: 'mint-toast-error'});
            } else {
              this.startDate = this.getNowFormatDate(str);
              this.$emit('updateCustom', this.startDate + ' 00:00:00', this.endDate + ' 23:59:59');
            }
            break;
          case 'end':
            let startMesc = new Date(this.startDate + " 00:00:00").getTime();
            // 如果结束日期小于开始时间，则提示日期选择错误
            if (mesc < startMesc) {
              this.Toast({message: '日期选择错误', className: 'mint-toast-error'});
            } else {
              this.endDate = this.getNowFormatDate(str);
              this.$emit('updateCustom', this.startDate + ' 00:00:00', this.endDate + ' 23:59:59');
            }
            break;
        }
      }
    }
  }
</script>

<style lang="stylus">
  .mt-cell-wrapper
    .mt-custom-search
      display none
      height 52px
      .mt-custom-searchbar
        position relative
        display flex
        padding 8px 10px
        align-items center
        box-sizing border-box
        -webkit-box-align center
        -ms-flex-align center
        background-color #ffffff
        .mint-button
          display none
          padding 0 10px
          height 26px
          border-radius 4px
        .mt-confirm
          margin-right 6px
        .mt-custom-search-inner
          position relative
          display flex
          flex 1
          -webkit-box-flex 1
          height 28px
          padding 4px 6px
          align-items center
          -webkit-box-align center
          -ms-flex-align center
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

    .search-focus
      .mt-custom-searchbar
        .mint-button
          display block

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
    .mt-custom-search
      display block
    .mt-custom-date
      display none

  .mt-cell-wrapper.mt-date
    .mt-custom-search
      display none
    .mt-custom-date
      display flex
</style>