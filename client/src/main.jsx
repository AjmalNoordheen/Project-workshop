import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import { Store, persistor } from './Redux/Store'
import { PersistGate } from 'redux-persist/integration/react'
import {GoogleOAuthProvider} from '@react-oauth/google'
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='269801762954-b153056p4nb50sc60ffd6sav2ktvdt1d.apps.googleusercontent.com'>
    <Provider store={Store}>
     <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
       <App/>
    </BrowserRouter>
    </PersistGate>
    </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
