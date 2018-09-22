<template>
  <ul class="sales-base-type">
    <li @click="popupCategory('left')">
      <span>{{left.value}}</span>
      <i class="mt-allow-right"></i>
    </li>
    <li @click="popupCategory()">
      <span>{{right.value}}</span>
      <i class="mt-allow-right"></i>
    </li>

    <!-- 类别选择popup -->
    <mt-popup position="bottom" v-model="leftVisible">
      <mt-picker :slots="left.slots" :valueKey="left.valueKey" @change="onLeftValuesChange"></mt-picker>
    </mt-popup>

    <!-- 供应商选择popup -->
    <mt-popup position="bottom" v-model="rightVisible">
      <mt-picker :slots="right.slots" :valueKey="right.valueKey" @change="onRightValuesChange"></mt-picker>
    </mt-popup>
  </ul>
</template>

<script>
  export default {
    name: "TypeSupplier",
    props: {left: Object, right: Object},

    data: function () {
      return {
        leftVisible: false,
        rightVisible: false,

        // 左侧选项
        leftId: '',
        lText: '',
        // 右侧选项
        rightId: '',
        rText: ''
      }
    },

    methods: {
      // 更改左侧选项
      onLeftValuesChange: function (picker, value) {
        if (!value[0]) return;

        this.leftId = value[0][this.left.idKey];
        this.lText = value[0][this.left.valueKey];
      },

      // 更改右侧选项
      onRightValuesChange: function (picker, value) {
        if (!value[0]) return;

        this.rightId = value[0][this.right.idKey];
        this.rText = value[0][this.right.valueKey];
      },

      // 更改popup的状态
      popupCategory: function (type) {
        if (type) {
          this.leftVisible = true;
        } else {
          this.rightVisible = true;
        }
      },
    },

    watch: {
      leftVisible: function (val) {
        if (!val) this.$emit('updateTypeSupplier', this.leftId, this.lText, 'left');
      },

      rightVisible: function (val) {
        if (!val) this.$emit('updateTypeSupplier', this.rightId, this.rText, 'right');
      }
    }
  }
</script>

<style lang="stylus">
  .sales-base-type
    display flex
    align-items center
    justify-content center
    height 40px
    border-top 1px solid #dddddd
    background-color #ffffff
    li
      position relative
      width 50%
      height 26px
      line-height 26px
      span
        display inline-block
        max-width 80%
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      .mt-allow-right
        -webkit-transform translateY(-9px) rotate(45deg)
        -moz-transform translateY(-9px) rotate(45deg)
        -ms-transform translateY(-9px) rotate(45deg)
        -o-transform translateY(-9px) rotate(45deg)
        transform translateY(-9px) rotate(45deg)
    li:first-child
      width calc(50% - 1px)
      border-right 1px solid #dddddd
</style>