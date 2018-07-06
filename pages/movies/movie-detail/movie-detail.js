import { Movie } from 'class/Movie.js';
var util = require('../../../utils/util.js')
var app = getApp()
Page({
  data: {
    movie: {}
  },

  onLoad: function(options) {
    var id = options.id
    var detailUrl = app.globalData.doubanBase + "/v2/movie/subject/" + id
    var movie = new Movie(detailUrl)
    movie.getMovieData((movie) => {
      this.setData({
        movie: movie
      })
    })

  },
  viewMoviePostImg: function(event) {
    var src = event.currentTarget.dataset.src
    wx.previewImage({
      urls: [src],
    })
  }
})