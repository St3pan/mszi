const utils = require("./Utils")

class Individ {
  constructor(individ) {
    this.originGeneratedNumber = individ
    this.binaryNumber = individ.toString(2)
    this.quantityOfOnes = (this.binaryNumber.match(/1/g) || []).length
    this.minInterval = 0
    this.maxInterval = 0
  }
  mutate(mutationThreshold) {
    let rand = Math.random()
    if (rand < mutationThreshold) {
      let genToBeChanged = utils.getRandomInt(16)
      if (this.binaryNumber[genToBeChanged] === "0") {
        const splited = this.binaryNumber.split("")
        splited[genToBeChanged] = "1"
        this.binaryNumber = splited.join("")
      } else if (this.binaryNumber[genToBeChanged] === "1") {
        const splited = this.binaryNumber.split("")
        splited[genToBeChanged] = "0"
        this.binaryNumber = splited.join("")
      }
    }
  }
}

module.exports = Individ
