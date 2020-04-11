# mszi

- Utils
  - getRandomInt - use to get random integer
  - unique - use to create array of unique objects (example: next population)
- Individ - represents one person from population
  - mutate - changes random bit with probability
- Algorithm:
  - generateFirstPopulation - creates first 20 members
  - nextPopulation - creates a new population with unique members only
  - foundParents - looking for parents (triadic crossover)
  - getChildren - creates childrens and adds them to main population
  - getFitness - looking for the fitness individ
  - isFitnessFound - checking fitness streak
  - getOptimalSolution - main loop
