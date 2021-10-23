import React, { useState } from 'react'
import AnswerInput from '../AnswerInput/AnswerInput'
import QuizStatus from '../QuizStatus/QuizStatus'
import { questionTypes } from '../consts'
import { generateQuestions, shuffle } from '../utils'
import classes from './Quiz.module.css'

const { READING } = questionTypes

const Quiz = ({ translations }) => {
  const [questions, setQuestions] = useState(generateQuestions(translations))
  const [thisQuestion, setThisQuestion] = useState(questions[0])
  const [resultArray, setResultArray] = useState([])
  const [answerStreak, setAnswerStreak] = useState(0)
  const questionCount = translations.length * 2
  const correctAnswers = resultArray.length ? resultArray.reduce((a, b) => a + b) : 0

  const handleNext = () => {
    if (answerStreak !== 0) {
      setThisQuestion(questions[1])
      setQuestions(questions.slice(1, questions.length))
    } else {
      const shuffledQs = shuffle(questions)
      setThisQuestion(shuffledQs[0])
      setQuestions(shuffledQs)
    }
  }

  const handleCorrect = () => {
    setResultArray([...resultArray, 1])
    setAnswerStreak(answerStreak + 1)
  }

  const handleIncorrect = () => {
    setResultArray([...resultArray, 0])
    setAnswerStreak(0)
  }

  if (questions.length === 0) {
    return <h2>Quiz complete!!</h2>
  }
  const { question, answers, questionType } = thisQuestion

  return (
    <>
      <QuizStatus
        completed={correctAnswers}
        remaining={questionCount - correctAnswers}
        answerStreak={answerStreak}
        correctFraction={resultArray.length ? correctAnswers / resultArray.length : 0}
      />
      Translate for following words and phrases:
      <div className={classes.questionArea}>{question}</div>
      <AnswerInput
        answers={answers}
        handleCorrect={handleCorrect}
        handleIncorrect={handleIncorrect}
        handleNext={handleNext}
        hiragana={questionType === READING}
      />
    </>
  )
}

export default Quiz
