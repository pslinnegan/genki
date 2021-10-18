import React, { useState } from 'react'
import AnswerInput from './AnswerInput/AnswerInput'
import { questionTypes } from './consts'
import { generateQuestions } from './utils'

const { READING } = questionTypes

const Quiz = ({ translations }) => {
  const [questions, setQuestions] = useState(generateQuestions(translations))
  if (questions.length === 0) {
    return <h2>Quiz complete!!</h2>
  }
  const { question, answers, questionType } = questions[0]

  return (
    <>
      <p>Questions remaining: {questions.length}</p>
      <p>{questionType === READING ? `Write the following in hiragana:` : 'What is the meaning of the following?'}</p>
      <p>{question}</p>
      <AnswerInput
        answers={answers}
        questions={questions}
        setQuestions={setQuestions}
        hiragana={questionType === READING}
      />
    </>
  )
}

export default Quiz
