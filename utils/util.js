function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1)
  var array = []
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1)
    } else {
      array.push(0)
    }
  }
  return array
}

function http(url, callback) {
  wx.request({
    url: url,
    success: function(res) {
      callback(res.data)
    },
    fail: function(error) {
      console.log(error)
    }
  })
}

function convertToCastString(casts) {
  var temp = ''
  for (var idx in casts) {
    var item = casts[idx]
    temp = temp + item.name + ' / '
  }
  return temp.substring(0, temp.length - 2)
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var item = casts[idx]
    var cast = {
      img: item.avatars ? item.avatars.large : '',
      name: item.name
    }
    castsArray.push(cast)
  }
  return castsArray
}
module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http,
  convertToCastInfos: convertToCastInfos,
  convertToCastString: convertToCastString
}