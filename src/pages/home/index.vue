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
        <homeRecommend v-if="current === 0"></homeRecommend>
        <homeCategory v-if="current === 1"></homeCategory>
        <homeNew v-if="current === 2"></homeNew>
        <homeAlbum v-if="current === 3"></homeAlbum>
      </view>
    </view>
  </view>
</template>

<script>
import homeAlbum from "./homeAlbum/index";
import homeCategory from "./homeCategory/index";
import homeNew from "./homeNew/index";
import homeRecommend from "./homeRecommend/index";
import { uniSegmentedControl } from "@dcloudio/uni-ui";

export default {
  components: {
    homeAlbum,
    homeCategory,
    homeNew,
    homeRecommend,
    uniSegmentedControl,
  },
  data() {
    return {
      items: [
        { title: "推荐" },
        { title: "分类" },
        { title: "最新" },
        { title: "专辑" },
      ],
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
  async onLoad(options) {
    // console.log(this.items.map((item) => item.title));
    // let res = await this.request({
    //   url: "http://157.122.54.189:9088/image/v1/vertical/category",
    // });

    // let res = await uni.request({
    //   url: "http://157.122.54.189:9088/image/v1/vertical/category",
    //   method: "GET",
    // }); 
    // console.log(res);
    // let res = await this.request({url:"/v1/vertical/category"});
    // console.log(res);
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