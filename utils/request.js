export const request = (parmas) => {
    uni.showLoading({
        title: '加载中'
    });
    return new Promise((resolve, reject) => {
        uni.request({
            url: getApp().globalData.httpUrl + parmas.url,
            method: parmas.method,
            data: JSON.stringify(parmas.data),
            header:
                parmas.method === 'POST'
                    ? {
                          'content-type': 'application/x-www-form-urlencoded'
                      }
                    : {
                          'content-type': 'application/json'
                      },
            success: (res) => {
                if (res.statusCode !== 200) {
                    resolve(res.data);
					uni.hideLoading();
                } else {
                    resolve(res.data);
                    uni.hideLoading();
                }
            },
            fail: (err) => {
                reject(err);
                uni.hideLoading();
                uni.showToast({
                    icon: 'none',
                    title: '网络错误',
                    duration: 2000
                });
            }
        });
    });
};
