<template>
  <view>
    <view class="header">
      <view class="tabbar">
        <uni-segmented-control
          :current="current"
          :values="items.map((item) => item.title)"
          @clickItem="onClickItem"
          style-type="text"
          active-color="#00a1d6"
        ></uni-segmented-control>
      </view>
      <view class="search">
        <i class="iconfont icon-fangdajing"></i>
      </view>
    </view>
    <view class="main">
      <view class="content">
        <view v-if="current === 0">
          <zjCateNew :passId="id"></zjCateNew>
        </view>
        <view v-if="current === 1">
          <zjCateHot :passId="id"></zjCateHot>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import zjCateHot from "@/components/zjCateHot";
import zjCateNew from "@/components/zjCateNew";
import { uniSegmentedControl } from "@dcloudio/uni-ui";

export default {
  components: {
    uniSegmentedControl,
    zjCateHot,
    zjCateNew,
  },
  data() {
    return {
      id: "",
      items: [{ title: "最新" }, { title: "热门" }],
      current: 0,
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
  },
  onLoad(options) {
    this.id = options.id;
  },
};
</script>

<style lang="scss">
.header {
  position: relative;
  .tabbar {
    width: 70%;
    margin: 0 auto;
  }
  .search {
    position: absolute;
    top: 22rpx;
    right: 50rpx;
    font-size: 40rpx;
  }
}
</style>