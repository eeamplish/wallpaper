<template>
  <scroll-view
    @scrolltolower="getNewData"
    scroll-y
    class="recommends"
    v-if="recommends.length !== 0"
  >
    <view class="recommend_wrap">
      <navigator
        class="com_recommend"
        v-for="item in recommends.items"
        :key="item._id"
        :url="`/pages/album/index?id=${item._id}`"
      >
        <image :src="item.thumb" mode="widthFix" />
      </navigator>
    </view>
    <view class="month_wrap">
      <view class="mon_title">
        <view class="mon_left">
          <view class="mon_time">
            <text>{{ DD }}</text
            >{{ "/ " + MM + "月" }}
          </view>
          <view class="mon_slogan">{{ picBox.title }}</view>
        </view>
        <view class="mon_right">更多 ></view>
      </view>
      <view class="mon_content">
        <view
          class="mon_picbox"
          v-for="(item, index) in picBox.items"
          :key="item.id"
        >
          <getDetail :picList="picBox.items" :index="index">
            <image
              :src="item.img + item.rule.replace('$<Height>', 360)"
              mode="aspectFill"
            />
          </getDetail>
        </view>
      </view>
    </view>

    <view class="hot_wrap">
      <view class="hot_title">热门</view>
      <view class="hot_content">
        <view
          class="hot_picbox"
          v-for="(item, index) in hotList"
          :key="item._id"
        >
          <getDetail :picList="hotList" :index="index">
            <image :src="item.thumb" mode="widthFix" />
          </getDetail>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import moment from "moment";
import getDetail from "@/components/getDetail";
export default {
  components: {
    getDetail,
  },
  data() {
    return {
      recommends: [],
      picBox: [],
      hotList: [],
      requestData: { limit: 20, order: "hot", skip: 0 },
    };
  },
  methods: {
    getNewData() {
      console.log(this.requestData);
      this.getdata();
    },
    getdata() {
      this.request({
        url: "/v3/homepage/vertical",
        method: "GET",
        data: this.requestData,
      }).then((res) => {
        this.requestData.skip += this.requestData.limit;
        this.recommends = res.data.res.homepage[1];
        this.picBox = res.data.res.homepage[2];
        this.hotList = [...this.hotList, ...res.data.res.vertical];
      });
    },
  },
  mounted() {
    // let res = await this.request({
    //   url: "/v3/homepage/vertical",
    //   method: "GET",
    //   data: { limit: 20, order: "", skip: 0 },
    // });
    // this.recommends = res.data.res;
    // console.log(this.recommends);

    this.getdata();
  },
  computed: {
    MM() {
      return moment(this.picBox.stime).format("MM");
    },
    DD() {
      return moment(this.picBox.stime).format("DD");
    },
  },
};
</script>

<style lang="scss">
.recommends {
  height: calc(100vh - 36px);
  .recommend_wrap {
    display: flex;
    flex-wrap: wrap;
    .com_recommend {
      width: 50%;
      padding: 5rpx;
    }
  }
  .month_wrap {
    .mon_title {
      color: $color;
      display: flex;
      justify-content: space-between;
      padding: 8rpx;
      align-items: center;
      .mon_left {
        display: flex;
        .mon_time {
          text {
            font-size: 34rpx;
          }
        }
        .mon_slogan {
          font-size: 32rpx;
          color: #111;
          margin-left: 20rpx;
        }
      }
    }
    .mon_content {
      display: flex;
      flex-wrap: wrap;
      .mon_picbox {
        width: 33.33%;
        padding: 5rpx;
      }
    }
  }
  .hot_wrap {
    .hot_title {
      padding: 8rpx;
      padding-left: 18rpx;
      font-size: 32rpx;
      position: relative;
      &::after {
        position: absolute;
        content: "";
        left: 0;
        top: 18rpx;
        width: 6rpx;
        height: 25rpx;
        background-color: $color;
      }
    }
    .hot_content {
      display: flex;
      flex-wrap: wrap;
      .hot_picbox {
        width: 33.33%;
        padding: 5rpx;
      }
    }
  }
}
</style>