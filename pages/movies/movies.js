// pages/movies/movies.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters"
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon"
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250"
    this.getMovieListData(inTheatersUrl)
    this.getMovieListData(comingSoonUrl)
    this.getMovieListData(top250Url)
  },

  getMovieListData: function(url) {
    wx.request({
      url: url,
      success: function(res) {
        console.log(res)
      },
      fail: function(error) {
        console.log(error)
      }
    })
  }

})