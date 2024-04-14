import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material'
import './index.css'

const theam = createTheme({
  palette: {
    primary: {
      main: "#2196f3"
    }
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600
    }
  },
  paper:{
    
  }
  
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theam}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
)
