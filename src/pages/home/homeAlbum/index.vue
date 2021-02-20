<template>
  <scroll-view
    class="album"
    @scrolltolower="getNewData"
    scroll-y
    v-if="bannerList.length !== 0"
  >
    <view class="album_swiper">
      <swiper indicator-dots autoplay circular>
        <swiper-item v-for="item in bannerList" :key="item.id">
          <image :src="item.thumb" mode="aspectFill" />
        </swiper-item>
      </swiper>
    </view>
    <view class="album_box">
      <navigator
        class="album_item"
        v-for="item in albumList"
        :key="item.id"
        :url="`/pages/album/index?id=${item.id}`"
      >
        <image :src="item.cover" mode="aspectFill" />
        <view class="item_right">
          <view class="right_title">{{ item.name }}</view>
          <view class="right_content">{{ item.desc }}</view>
          <view class="right_follow">
            <view class="btn">+ 关注</view>
          </view>
        </view>
      </navigator>
    </view>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      params: {
        limit: 20,
        order: "new",
        skip: 0,
      },
      bannerList: [],
      albumList: [],
    };
  },
  methods: {
    getDatalist() {
      this.request({
        url: "/v1/wallpaper/album",
        data: this.params,
        method: "GET",
      }).then((res) => {
        this.params.skip += this.params.limit;
        this.bannerList = res.data.res.banner;
        this.albumList = [...this.albumList, ...res.data.res.album];
        console.log(this.albumList );
      });
    },
    getNewData() {
      this.getDatalist();
    },
  },
  mounted() {
    uni.setNavigationBarTitle({ title: "专辑" });
    this.getDatalist();
  },
};
</script>

<style lang="scss">
.album {
  height: calc(100vh - 36px);
  .album_swiper {
    swiper {
      height: calc(750rpx / 2.2);
      image {
        height: 100%;
      }
    }
  }
  .album_box {
    padding: 8rpx;
    .album_item {
      display: flex;
      justify-content: space-between;
      padding: 10rpx;
      border-bottom: 1px solid #ccc;
      image {
        width: 200rpx;
        height: 200rpx;
        margin-right: 20rpx;
        flex: 1;
      }
      .item_right {
        flex: 2;
        .right_title {
          font-size: 32rpx;
          font-weight: bold;
          margin-bottom: 20rpx;
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .right_content {
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          font-size: 24rpx;
          margin-bottom: 40rpx;
        }
        .right_follow {
          text-align: right;
          .btn {
            display: inline-block;
            color: $color;
            border: 1px solid $color;
            font-size: 30rpx;
            padding: 5rpx;
            border-radius: 6rpx;
          }
        }
      }
    }
  }
}
</style>