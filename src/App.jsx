import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Provider } from 'react-redux'
import store from './store/store'
import ErrorNotifier from './components/elements/ErrorNotifier'
import SuccessNotifier from './components/elements/SuccessNotifier'
import ScrollToTop from './components/layouts/ScrollToTop'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import Login from './components/pages/auth/Login'
import Producer from './components/pages/user/Producer'
import PasswordResetRequest from './components/pages/auth/PasswordResetRequest'
import PasswordReset from './components/pages/auth/PasswordReset'
import Dashboard from './components/pages/user/producer/Dashboard'
import ProducerErrorPage from './components/pages/user/producer/ProducerErrorPage'
import Signup from './components/pages/onboarding/Signup'

function App() {
  return (
    <main>
      <Provider store={store}>
        <ErrorNotifier />
        <SuccessNotifier />
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/password-reset" element={<PasswordResetRequest />} />
            <Route path="/password-reset/:resetCode" element={<PasswordReset />} />

            <Route path="/signup" element={<Signup />} />

            
            <Route path="/producer" element={<Producer />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />

              {/* <Route path="*" element={<AdminErrorPage />} /> */}
              <Route path="*" element={<ProducerErrorPage />} />
            </Route>

          </Routes>
        </ScrollToTop>
      </Provider>
    </main>
  )
}

export default App
