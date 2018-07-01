
var postsData = require('../../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var postId = options.id
    this.data.currentPostId = postId
    var postData = postsData.postList[postId]
    this.setData({
      postData:postData
    })
    
    var postsCollected = wx.getStorageSync("posts_collected")
    if(postsCollected){
      var postCollected = postsCollected[postId]
      this.setData({
        collected:postCollected
      })
    }else{
      var postsCollected ={}
      postsCollected[postId] = false
      wx.setStorageSync("posts_collected", postsCollected)
    }
  },
  onCollectionTap:function(event){
    var that = this
    wx.getStorage({
      key:"posts_collected",
      success:function(res){
        var postsCollected = res.data
        var postCollected = postsCollected[that.data.currentPostId]
        postCollected = !postCollected
        postsCollected[that.data.currentPostId] = postCollected
        wx.setStorageSync("posts_collected", postsCollected)
        that.setData({
          collected: postCollected
        })
      }
    })
  },

  
  


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})