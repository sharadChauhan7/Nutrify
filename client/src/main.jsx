import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { Toaster, toast } from 'sonner'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
// Config env
// import 'dotenv/config'


const theam = createTheme({
  palette: {
    primary: {
      main: "#ffd60a"
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
  
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theam}>
    <Provider store={store}>
    <Toaster position="top-center" expand visibleToasts={3} toastOptions={{
    unstyled: false,
    classNames: {
      toast: 'p-3',
    },
  }}/>
      <App />
    </Provider>
  </ThemeProvider>
)
