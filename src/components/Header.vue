<template>
  <mt-header :title="header.title">
    <router-link v-if="header.back" :to="header.to" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
    <mt-button icon="" slot="right">
      <img class="mt-store-selection" src="../assets/images/icon_store_selection@2x.png" @click="popupStoreSelection">
    </mt-button>
  </mt-header>
</template>

<script>
  export default {
    name: "Header",
    props: {header: Object},

    data: function () {
      return {
        visible: false,
        pHolder: '',
      }
    },

    methods: {
      // 弹出选择店铺的popup
      popupStoreSelection: function () {
        if (!this.isSessionEntityId()) return this.showMessage('请先登录！');

        this.storeVue.$emit('popupStore');
      },

      // 选择店铺
      selectThisShop: function (id) {
        this.visible = false;
        this.$emit('updateShopId', id);
      },

      isSessionEntityId: function () {
        let eId = sessionStorage.getItem('entityId');
        return eId && eId !== 'undefined';
      }
    }
  }
</script>

<style lang="stylus"></style>