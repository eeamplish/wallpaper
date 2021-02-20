<template>
  <view class="album_detail" v-if="albumObj.id">
    <view class="detail_banner">
      <image :src="albumObj.cover" mode="widthFix" />
      <view class="follow_box">
        <view class="box_title">{{ albumObj.name }}</view>
        <view class="box_btn">关注专辑</view>
      </view>
    </view>
    <view class="detail_author">
      <view class="avatar">
        <image :src="albumObj.user.avatar" mode="scaleToFill" />
        <text class="name">{{ albumObj.user.name }}</text>
      </view>
      <view class="author_say">
        {{ albumObj.desc }}
      </view>
    </view>
    <view class="detail_wallpaper">
      <view
        class="wallpaper_item"
        v-for="(item, index) in wallpaperList"
        :key="item.id"
      >
        <getDetail :picList="wallpaperList" :index="index">
          <image
            :src="item.img + item.rule.replace('$<Height>', 360)"
            mode="widthFix"
          />
        </getDetail>
      </view>
    </view>
  </view>
</template>

<script>
import getDetail from "@/components/getDetail";
export default {
  components: {
    getDetail,
  },
  data() {
    return {
      params: {
        limit: 20,
        order: "new",
        skip: 0,
        first: 1,
      },
      albumId: "",
      albumObj: {},
      wallpaperList: [],
      hasMore: true,
    };
  },
  methods: {
    getAlbumDetail() {
      this.request({
        url: `/v1/wallpaper/album/${this.albumId}/wallpaper`,
        data: this.params,
        method: "GET",
      }).then((res) => {
        this.params.skip += this.params.limit;
        // 判断是否第一次请求
        if (this.params.first !== 0) {
          this.params.first = 0;
          this.albumObj = res.data.res.album;
        }
        console.log(this.albumObj);
        // 判断是否还有数据
        if (res.data.res.wallpaper.length === 0) {
          this.hasMore = false;
        }
        this.wallpaperList = [...this.wallpaperList, ...res.data.res.wallpaper];
      });
    },
    // 页面触底
    onReachBottom() {
      if (this.hasMore) {
        this.getAlbumDetail();
      } else {
        uni.showToast({
          title: "没有更多数据了",
          icon: "none",
        });
      }
    },
  },
  onLoad(options) {
    this.albumId = options.id;
    this.getAlbumDetail();
  },
};
</script>

<style lang="scss">
.album_detail {
  .detail_banner {
    position: relative;
    image {
    }
    .follow_box {
      position: absolute;
      bottom: 40rpx;
      left: 0;
      display: flex;
      padding: 20rpx;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      .box_title {
        width: 60%;
        color: #fff;
        font-size: 32rpx;
      }
      .box_btn {
        width: 20%;
        background-color: $color;
        color: #fff;
        height: 60rpx;
        text-align: center;
        line-height: 60rpx;
        border-radius: 10rpx;
        font-size: 28rpx;
      }
    }
  }
  .detail_author {
    padding: 20rpx;
    .avatar {
      display: flex;
      align-items: center;
      margin-bottom: 6rpx;
      image {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        margin-right: 5rpx;
      }
      .name {
        font-size: 32rpx;
        font-weight: bold;
      }
    }
    .author_say {
      padding: 0 10rpx;
      line-height: 40rpx;
      font-size: 30rpx;
      letter-spacing: 1rpx;
    }
  }
  .detail_wallpaper {
    display: flex;
    flex-wrap: wrap;
    .wallpaper_item {
      width: 33.33%;
      padding: 5rpx;
      image {
      }
    }
  }
}
</style>