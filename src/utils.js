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
    const hasKanji = japanese?.kanji && japanese?.kanji.length > 0
    const jMain = randomChoice(japanese.main)
    const jQuestion = hasKanji ? `${japanese.kanji} (${jMain})` : jMain
    questions.push({
      question: jQuestion,
      answers: [...english.main, ...english.other],
      questionType: questionTypes.MEANING,
    })
    const jAnswersMain = [...japanese.main, ...japanese.other]
    const jAnswer = hasKanji ? [jQuestion, ...jAnswersMain] : jAnswersMain
    questions.push({
      question: randomChoice(english.main),
      answers: [...japanese.main, ...japanese.other],
      questionType: questionTypes.READING,
    })
  }
  return shuffle(questions)
}
