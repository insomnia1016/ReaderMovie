var postsData = require('../../../data/posts-data.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postId = options.id
    this.data.currentPostId = postId
    var postData = postsData.postList[postId]
    this.setData({
      postData: postData
    })

    var postsCollected = wx.getStorageSync("posts_collected")
    if (postsCollected && postCollected) {
      var postCollected = postsCollected[postId]
      if (postCollected) {
        this.setData({
          collected: postCollected
        })
      }
    } else {
      var postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync("posts_collected", postsCollected)
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor()
  },
  setMusicMonitor: function() {
    var that = this
    wx.onBackgroundAudioPlay(function() {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true
      app.globalData.g_currentMusicPostId = that.data.currentPostId
    })
    wx.onBackgroundAudioPause(function() {
      that.setData({
        isPlayingMusic: false
      })

      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
    wx.onBackgroundAudioStop(function() {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
  },
  onCollectionTap: function(event) {
    //this.getPostsCollectedAsy()
    this.getPostsCollectedSyc()
  },
  onShareTap: function() {
    var itemList = [
      "分享到微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        if (res.cancel) {
          console.log('用户点击了取消')
        }
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '用户是否取消' + res.cancel + '现在还无法实现分享功能，api不支持。',
        })
      },
      fail: function(res) {
        //点击“取消”按钮，errMsg显示“showActionSheet:fail cancel”
        console.log(res.errMsg)
      }
    })
  },
  onMusicTap: function(event) {
    var currentPostId = this.data.currentPostId
    var musicData = postsData.postList[currentPostId]
    var isPlayingMusic = this.data.isPlayingMusic
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })

    } else {
      wx.playBackgroundAudio({
        dataUrl: musicData.music.url,
        title: musicData.music.title,
        coverImgUrl: musicData.music.coverImg,
      })
      this.setData({
        isPlayingMusic: true
      })

    }

  },
  getPostsCollectedSyc: function() {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId]
    postCollected = !postCollected
    postsCollected[this.data.currentPostId] = postCollected
    this.showToast(postCollected, postsCollected)
  },

  getPostsCollectedAsy: function() {
    var that = this
    wx.getStorage({
      key: "posts_collected",
      success: function(res) {
        var postsCollected = res.data
        var postCollected = postsCollected[that.data.currentPostId]
        postCollected = !postCollected
        postsCollected[that.data.currentPostId] = postCollected
        that.showToast(postCollected, postsCollected)
      }
    })
  },
  showModel: function(postCollected, postsCollected) {
    var that = this
    wx.showModal({
      title: '收藏',
      content: postCollected ? '收藏该文章?' : '取消收藏该文章?',
      confirmColor: '#405f80',
      success: function(res) {
        if (res.confirm) {
          wx.setStorageSync("posts_collected", postsCollected)
          that.setData({
            collected: postCollected
          })
        }
      }

    })
  },

  showToast: function(postCollected, postsCollected) {
    wx.setStorageSync("posts_collected", postsCollected)
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 1000,
      icon: "success"
    })
  },

})