<template>
  <view class="classify">
    <view class="bigbox">
      <view class="class-item" v-for="item in cateList" :key="item._id">
        <navigator :url="`/pages/imgCategory/index?id=${item.id}`">
          <image :src="item.cover" mode="widthFix" />
          <text>{{ item.ename }}</text>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      cateList: [],
    };
  },
  methods: {},
  beforeCreate() {
    this.request({
      url: "/v1/vertical/category",
      method: "GET",
    }).then((res) => {
      console.log(res.data.res.category);
      this.cateList = res.data.res.category;
    });
  },
};
</script>

<style lang="scss">
.classify {
  .bigbox {
    display: flex;
    flex-wrap: wrap;
    .class-item {
      width: 33.33%;
      padding: 5rpx;
      position: relative;
      text {
        position: absolute;
        left: 20rpx;
        bottom: 10rpx;
        color: #fff;
      }
    }
  }
}
</style>