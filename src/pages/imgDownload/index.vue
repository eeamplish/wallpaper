<template>
  <view class="img_download">
    <image
      :src="imgSrc"
      mode="widthFix"
    />
    <button @click="download">下载图片</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: "",
    };
  },
  methods: {
    download(){
      console.log(this.imgSrc);
      uni.downloadFile({
        url: this.imgSrc,
        success: ({ tempFilePath, statusCode }) => {
          console.log(tempFilePath);
          
          // 保存图片
          uni.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success: (result) => {
              console.log(result);
            },
            fail: (error) => {
              console.log(error);
            }
          })

        },
        fail: (error) => {}
      })
    }
  },
  onLoad(options) {
    // console.log(options.src);
    this.imgSrc = options.src;
  },
};
</script>

<style lang= "scss">
  .img_download {
    button {
      background-color: $color;
      width: 90%;
      font-size: 40rpx;
      color: #fff;
      margin-top: 20rpx;
    }
  }
</style>