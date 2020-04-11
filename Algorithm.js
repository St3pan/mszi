const utils = require("./Utils")
const Individ = require("./Individ")

class Algorithm {
  constructor() {
    this.population = new Array(20)
    this.FitnessStreak = 0
    this.previousPopulationFitnessIndivid = null
    this.stopCriteria = 100
  }
  generateFirstPopulation() {
    for (let i = 0; i < 20; i++) {
      this.population[i] = new Individ(utils.getRandomInt(32768) + 32767)
    }
  }
  nextPopulation() {
    this.population = utils.unique(this.population)
    this.foundParents()
  }
  foundParents() {
    let sumOfAllOnes = 0
    for (let i = 0; i < this.population.length; i++) {
      sumOfAllOnes += this.population[i].quantityOfOnes
    }
    this.population.map(
      (e) =>
        (e.chanceOfBeingSelected = +(e.quantityOfOnes / sumOfAllOnes).toFixed(
          // calculating chance of being selected for every individ
          10
        ))
    )
    let previous = 0
    for (let i = 0; i < this.population.length; i++) {
      // setting intervals for every individ
      if (i === 0) {
        previous = 0
      } else {
        previous = +this.population[i - 1].maxInterval.toFixed(10)
      }
      this.population[i].minInterval = previous
      this.population[i].maxInterval = +(
        previous + this.population[i].chanceOfBeingSelected
      ).toFixed(10)
    }
    let allParents = new Array()
    let threeParents = new Array()
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 3; j++) {
        let rand = Math.random().toFixed(10)
        for (let k = 0; k < this.population.length; k++) {
          if (
            this.population[k].minInterval < rand &&
            this.population[k].maxInterval >= rand
          ) {
            threeParents[j] = this.population[k]
            break
          }
        }
      }
      threeParents[2].mutate(0.1)
      allParents.push(threeParents)
      threeParents = []
    }
    this.getChildren(allParents)
  }
  getChildren(allParents) {
    let childrens = new Array()
    allParents.forEach((groupOfParents) => {
      let firstParent, secondParent, mask
      try {
        firstParent = groupOfParents[0].binaryNumber
        secondParent = groupOfParents[1].binaryNumber
        mask = groupOfParents[2].binaryNumber
      } catch (e) {
        console.log(groupOfParents)
      }
      let firstChildren = ""
      let secondChildren = ""
      for (let i = 0; i < firstParent.length; i++) {
        if (firstParent[i] === mask[i]) {
          firstChildren += firstParent[i]
          secondChildren += secondParent[i]
        } else {
          firstChildren += secondParent[i]
          secondChildren += firstParent[i]
        }
      }
      childrens.push(firstChildren)
      childrens.push(secondChildren)
    })
    childrens.map((e) => this.population.push(new Individ(parseInt(e, 2))))
    for (let i = childrens.length; i < this.population.length; i++) {
      this.population[i].mutate(0.03)
    }
  }
  getFitness() {
    let sortedPopulation = this.population
    sortedPopulation.sort((a, b) =>
      a.originGeneratedNumber > b.originGeneratedNumber ? -1 : 1
    )
    return sortedPopulation[0].originGeneratedNumber
  }
  isFitnessFound() {
    if (this.getFitness() === this.previousPopulationFitnessIndivid) {
      this.FitnessStreak++
    } else {
      this.FitnessStreak = 0
      this.previousPopulationFitnessIndivid = this.getFitness()
    }
    return this.FitnessStreak >= this.stopCriteria
  }
  getOptimalSolution() {
    let iteration = 0
    while (!this.isFitnessFound()) {
      this.nextPopulation()
      iteration++
      console.log(`population #${iteration}`)
    }
    console.log(this.getFitness())
  }
}

const algorithm = new Algorithm()

algorithm.generateFirstPopulation()

algorithm.getOptimalSolution()
