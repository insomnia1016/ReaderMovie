// pages/movies/more-movie/more-movie.js
Page({

  data: {
    navigateTitle:""
  },
  onLoad: function (options) {
    var category = options.category
    this.setData({
      navigateTitle: category
    })
   
  },
  onReady:function(event){
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  }
  
})