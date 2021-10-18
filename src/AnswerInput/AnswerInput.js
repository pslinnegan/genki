import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import mappings from './mappings'
import { shuffle } from '../utils'

const AnswerInput = ({ hiragana, answers, questions, setQuestions }) => {
  const [val, setVal] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState(null)

  const mapText = (t) => {
    for (const mapping in mappings) {
      const doubleChar = `${mapping[0]}${mapping}`
      if (t.includes(doubleChar)) {
        t = t.replace(doubleChar, 'っ' + mappings[mapping])
      }
      if (t.includes(mapping)) {
        t = t.replace(mapping, mappings[mapping])
      }
    }
    return t
  }

  const checkAnswer = () => {
    console.log('User input: ', val)
    console.log('Available answers: ', answers)
    for (const answer of answers) {
      if (answer.toLowerCase() === val.toLowerCase()) {
        setCorrectAnswer(true)
        return
      }
    }
    setCorrectAnswer(false)
  }

  const nextQuestion = () => {
    setVal('')
    setCorrectAnswer(null)
    if (correctAnswer) {
      setQuestions(questions.slice(1, questions.length))
    } else {
      setQuestions(shuffle(questions))
    }
  }

  const handleChange = (e) => {
    setVal(hiragana ? mapText(e.target.value) : e.target.value)
  }

  return (
    <>
      <TextField
        id="outlined-basic"
        label={hiragana ? '答え' : 'Answer'}
        variant="outlined"
        value={val}
        onChange={(e) => handleChange(e)}
      />
      {correctAnswer === null ? (
        <Button onClick={checkAnswer}>Submit</Button>
      ) : (
        <Button onClick={nextQuestion}>Next question</Button>
      )}
      {correctAnswer && <p>Correct!!</p>}
      {correctAnswer === false && <p>Incorrect</p>}
    </>
  )
}

export default AnswerInput
