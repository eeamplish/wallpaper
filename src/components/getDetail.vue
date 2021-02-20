<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    picList: Array,
    index: Number,
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      // 缓存数据
      getApp().globalData.picList = this.picList;
      getApp().globalData.picIndex = this.index;
      // 点击跳转 记得pages.json注册
      uni.navigateTo({ url: "/pages/imgDetail/index" });
    },
  },
  mounted() {
  },
};
</script>

<style>
</style>