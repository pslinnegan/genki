import React, { useState } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import AnswerStatus from './AnswerStatus'
import mappings from './mappings'

const AnswerInput = ({ answers, handleCorrect, handleIncorrect, handleNext, hiragana }) => {
  const [val, setVal] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState(null)

  const answerStatus = correctAnswer ? 'success' : correctAnswer === false ? 'error' : ''

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
    for (const answer of answers) {
      if (answer.toLowerCase() === val.toLowerCase()) {
        setCorrectAnswer(true)
        handleCorrect()
        return
      }
    }
    setCorrectAnswer(false)
    console.log(answers)
    handleIncorrect()
  }

  const nextQuestion = () => {
    setVal('')
    setCorrectAnswer(null)
    handleNext()
  }

  const handleChange = (e) => {
    setVal(hiragana ? mapText(e.target.value) : e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      correctAnswer === null ? checkAnswer() : nextQuestion()
    }
  }

  return (
    <>
      <TextField
        fullWidth
        id="outlined-basic"
        label={hiragana ? '答え' : 'Answer'}
        variant="outlined"
        value={val}
        onChange={(e) => handleChange(e)}
        onKeyPress={(e) => handleKeyPress(e)}
        color={answerStatus}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={correctAnswer === null ? checkAnswer : nextQuestion}>
                <ChevronRightIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {correctAnswer !== null && <AnswerStatus correctAnswer={correctAnswer} answers={answers} />}
    </>
  )
}

export default AnswerInput
