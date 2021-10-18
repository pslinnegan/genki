import { questionTypes } from './consts'

export function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function generateQuestions(translationsArray) {
  let questions = []
  for (const { japanese, english } of translationsArray) {
    questions.push({ question: randomChoice(japanese), answers: english, questionType: questionTypes.MEANING })
    questions.push({ question: randomChoice(english), answers: japanese, questionType: questionTypes.READING })
  }
  return shuffle(questions)
}
