import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown'
import InboxIcon from '@mui/icons-material/Inbox'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import classes from './QuizStatus.module.css'

const QuizStatus = ({ completed, remaining, answerStreak, correctFraction }) => {
  return (
    <div className={classes.statusBar}>
      <CheckIcon />
      <span>{completed}</span>
      <InboxIcon />
      <span>{remaining}</span>
      <FlashOnIcon />
      <span>{answerStreak}</span>
      <ThumbsUpDownIcon />
      <span>{Math.round(correctFraction * 100)}%</span>
    </div>
  )
}

export default QuizStatus
