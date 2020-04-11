class Utils {
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }
  unique(arr) {
    let used = {}
    const filtered = arr.filter((obj) => {
      return obj.originGeneratedNumber in used
        ? 0
        : (used[obj.originGeneratedNumber] = 1)
    })
    return filtered
  }
}

const utils = new Utils()

module.exports = utils
