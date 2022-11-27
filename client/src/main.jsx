import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import UserState from './context/user/userState';
import AlertState from './context/alert/alertState';
import ResultState from './context/result/resultState';
import "./App.css"

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
const theme = extendTheme({ config })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AlertState>
      <UserState>
        <ResultState>
        <App />
        </ResultState>
      
      </UserState>
      </AlertState>
    </ChakraProvider>
  </React.StrictMode>
)
