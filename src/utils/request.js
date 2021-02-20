export default (params) => {
  let baseUrl = "http://157.122.54.189:9088/image"
  return new Promise((resolve, reject) => {
    uni.showLoading({ title: "加载中" });
    wx.request({
      ...params,
      url:baseUrl+params.url,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
      complete() {
        uni.hideLoading();
      },
    });
  });
};
