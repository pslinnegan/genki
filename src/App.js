import React, { useState } from 'react'
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemText,
} from '@mui/material'
import Quiz from './Quiz/Quiz'
import greetings from './questions/greetings'
import n5Grammar from './questions/jlptNFiveVocab'

const drawerWidth = 240

export default function PermanentDrawerLeft() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Genki
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          'width': drawerWidth,
          'flexShrink': 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Chapters
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4'].map((text, index) => (
            <ListItem button key={text} selected={index === selectedIndex} onClick={() => setSelectedIndex(index)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <Quiz translations={n5Grammar} />
      </Box>
    </Box>
  )
}
