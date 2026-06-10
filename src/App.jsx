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
import Login from './pages/auth/Login'
import Producer from './pages/user/Producer'
import PasswordResetRequest from './pages/auth/PasswordResetRequest'
import PasswordReset from './pages/auth/PasswordReset'
import Dashboard from './pages/user/producer/Dashboard'
import ProducerErrorPage from './pages/user/producer/ProducerErrorPage'
import Signup from './pages/onboarding/Signup'

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
              <Route path="/producer/dashboard" element={<Dashboard />} />

              {/* <Route path="*" element={<AdminErrorPage />} /> */}
              <Route path="*" element={<ProducerErrorPage />} />
            </Route>

            <Route path="/exporter" element={<Producer />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="/exporter/dashboard" element={<Dashboard />} />

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
