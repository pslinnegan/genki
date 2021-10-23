import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import c from './AnswerStatus.module.css'

const AnswerStatus = ({ correctAnswer, answers }) => {
  const [showAnswers, setShowAnswers] = useState(false)

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers)
  }

  const styles = `${c.answerArea} ${correctAnswer ? c.correctAnswer : c.incorrectAnswer}`
  if (correctAnswer) {
    return <div className={styles}>Correct</div>
  } else {
    return (
      <>
        <div className={styles}>
          Incorrect
          <IconButton onClick={toggleAnswers}>
            {showAnswers ? (
              <ArrowDropUpIcon style={{ color: 'white' }} />
            ) : (
              <ArrowDropDownIcon style={{ color: 'white' }} />
            )}
          </IconButton>
        </div>
        {showAnswers && (
          <div className={c.answersSection}>
            Available answers are:
            <ul>
              {answers.map((answer) => (
                <li>{answer}</li>
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default AnswerStatus
