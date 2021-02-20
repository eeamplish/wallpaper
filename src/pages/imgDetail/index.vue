<template>
  <view class="picDetail">
    <view class="pd_user">
      <view class="user_avatar">
        <image :src="picObj.user.avatar" mode="widthFix" />
      </view>
      <view class="user_desc">
        <view class="user_name">{{ picObj.user.name }}</view>
        <view class="create_time">{{ daysAgo }}</view>
      </view>
    </view>
    <view class="pd_banner">
      <navigator
        class="hot_item"
        :url="`/pages/imgDownload/index?src=${picObj.img}`"
      >
        <image :src="picObj.img" mode="aspectFill" />
      </navigator>
      <!-- <image :src="picObj.img" mode="aspectFill" /> -->
    </view>
    <view class="assess">
      <view class="like">
        <text class="iconfont icon-dianzan"></text>{{ picObj.rank }}
      </view>
      <view class="heart">
        <text class="iconfont icon-xianxingtubiaozhizuomoban-30"></text>收藏
      </view>
    </view>
  </view>
</template>

<script>
import moment from "moment";
moment.locale("zh-cn");
export default {
  data() {
    return {
      picObj: {},
    };
  },
  methods: {
    getComment() {
      this.request({
        url: `/v2/wallpaper/wallpaper/${this.picObj.id}/comment`,
        method: "GET",
      }).then((res) => {
        console.log(res);
      });
    },
  },
  mounted() {
    let { picList, picIndex } = getApp().globalData;
    this.picObj = picList[picIndex];
    console.log(this.picObj);
    this.getComment();

    // 下载图片
    // uni.downloadFile({
    //   url: '',
    //   success: ({ tempFilePath, statusCode }) => {},
    //   fail: (error) => {}
    // })

    // 保存图片
    // uni.saveImageToPhotosAlbum({
    //   filePath: ,
    //   success: (result) => {},
    //   fail: (error) => {}
    // })
  },
  computed: {
    daysAgo() {
      return moment(this.picObj.atime * 1000).fromNow();
    },
  },
};
</script>

<style lang="scss">
.picDetail {
  .pd_user {
    display: flex;
    padding: 30rpx;
    .user_avatar {
      width: 80rpx;
      height: 80rpx;
      margin-right: 20rpx;
      background-color: aqua;
      border-radius: 50%;
      overflow: hidden;
    }
    .user_desc {
      .user_name {
        font-size: 30rpx;
        font-weight: bold;
        margin-bottom: 6rpx;
      }
      .create_time {
        font-size: 24rpx;
        font-size: #999;
      }
    }
  }
  .pd_banner {
    width: 100%;
  }
  .assess {
    display: flex;
    text-align: center;
    align-items: center;
    height: 80rpx;
    border-bottom: 2rpx solid #ccc;
    .like {
      flex: 1;
      border-right: 2rpx solid #ccc;
    }
    .heart {
      flex: 1;
    }
  }
}
</style>