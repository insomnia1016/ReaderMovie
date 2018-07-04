// pages/movies/movies.js
var util = require('../../utils/util.js')
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
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters?start=0&count=3"
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon?start=0&count=3"
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250?start=0&count=3"
    this.getMovieListData(inTheatersUrl,'inTheaters','正在热映')
    this.getMovieListData(comingSoonUrl,'comingSoon','即将上映')
    this.getMovieListData(top250Url,'top250','豆瓣top250')
  },

  getMovieListData: function (url, settedKey, category) {
    var that = this
    wx.request({
      url: url,
      success: function(res) {
        that.processDouBanData(res.data, settedKey,category)
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },
  processDouBanData: function (moivesDouBan, settedKey, category) {
    var movies = []
    for (var idx in moivesDouBan.subjects) {
      var movie = moivesDouBan.subjects[idx]
      var title = movie.title
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...'
      }
      var temp = {
        stars: util.convertToStarsArray(movie.rating.stars),
        title: title,
        coverImg: movie.images.large,
        movieId: movie.id,
        average: movie.rating.average
      }
      movies.push(temp)
    }
    var readyData = {}
    readyData[settedKey] = {
      movies:movies,
      category: category,
    }
    this.setData(readyData)
  },
  onMoreTap:function(options){
    var category = options.currentTarget.dataset.category
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    })
  }

})