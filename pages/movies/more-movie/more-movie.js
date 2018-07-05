// pages/movies/more-movie/more-movie.js
var app = getApp()
var util = require('../../../utils/util.js')
Page({

  data: {
    movies: {},
    navigateTitle: "",
    requestUrl:"",
    totalCount:0,
    isEmpty:true
  },
  onLoad: function(options) {
    var category = options.category
    this.setData({
      navigateTitle: category
    })
    var dataUrl = ''
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters"
        break
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon"
        break
      case "豆瓣top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250"
        break
    }
    this.data.requestUrl = dataUrl
    util.http(dataUrl, this.processDouBanData)
  },
  onPullDownRefresh:function(event){
    var refreshUrl = this.data.requestUrl +"?start=0&count=20"
    this.data.movies = {}
    this.data.isEmpty = true
    this.data.totalCount = 0
    util.http(refreshUrl,this.processDouBanData)
    wx.showNavigationBarLoading()
  },
  onReachBottom:function(event){
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20" 
    util.http(nextUrl, this.processDouBanData)
    wx.showNavigationBarLoading()
  },
  processDouBanData: function(moivesDouBan) {
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
    var totalMovies = {}
    if (!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies)
    }else{
      totalMovies = movies
      this.data.isEmpty = false
    }
    this.setData({
      movies: totalMovies
    })
    this.data.totalCount += 20
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },
  onReady: function(event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  },
  onMovieTap: function (options) {
    var id = options.currentTarget.dataset.movieId
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + id,
    })
  }
  // onScrollLower:function(event){
  //   var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20" 
  //   util.http(nextUrl, this.processDouBanData)
  //   wx.showNavigationBarLoading()
  // }

})