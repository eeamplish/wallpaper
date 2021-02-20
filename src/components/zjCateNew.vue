<template>
  <scroll-view scroll-y class="hot_box" @scrolltolower="getMoreData">
    <view class="hot_itemlist">
      <navigator
        class="hot_item"
        :url="`/pages/imgDownload/index?src=${item.img}`"
        v-for="item in picList"
        :key="item._id"
      >
        <image :src="item.img" mode="widthFix" />
      </navigator>
    </view>
  </scroll-view>
</template>

<script>
export default {
  props: ["passId"],
  data() {
    return {
      // “new” 最新 “hot” 热门
      requestData: {
        limit: 20,
        skip: 0,
        order: "new",
      },
      picList: [],
    };
  },
  methods: {
    getHotlist(id) {
      this.request({
        url: `/v1/vertical/category/${id}/vertical`,
        data: this.requestData,
        method: "GET",
      }).then((res) => {
        console.log(res);
        if (res.data.res.vertical.length === 0) {
          uni.showToast({
            title: "没有数据了",
            // icon: 'success',
            mask: true,
          });
          return;
        } else {
          this.requestData.skip += this.requestData.limit;
        }
        this.picList = [...this.picList, ...res.data.res.vertical];
      });
    },
    getMoreData() {
      this.getHotlist(this.passId);
    },
  },
  mounted() {
    console.log(this.passId);
    this.getHotlist(this.passId);
  },
};
</script>

<style lang="scss">
.hot_box {
  height: calc(100vh - 36px);
  .hot_itemlist {
    display: flex;
    flex-wrap: wrap;
    .hot_item {
      width: 33.33%;
      padding: 10rpx;
    }
  }
}
</style>