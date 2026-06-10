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
import Locations from './pages/user/producer/locations/Locations';
import LocationDetails from './pages/user/producer/locations/LocationDetails';
import NewLocation from './pages/user/producer/locations/NewLocation';
import Assets from './pages/user/producer/assets/Assets';
import AssetDetails from './pages/user/producer/assets/AssetDetails';
import NewAsset from './pages/user/producer/assets/NewAsset';
import Events from './pages/user/producer/events/Events';
import EventDetails from './pages/user/producer/events/EventDetails';

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

              <Route path="/producer/locations" element={<Locations />} />
              <Route path="/producer/locations/location/:locationId" element={<LocationDetails />} />
              <Route path="/producer/locations/new-location" element={<NewLocation />} />

              <Route path="/producer/assets" element={<Assets />} />
              <Route path="/producer/assets/asset/:assetId" element={<AssetDetails />} />
              <Route path="/producer/assets/new-asset" element={<NewAsset />} />

              <Route path="/producer/events" element={<Events />} />
              <Route path="/producer/events/event/:eventId" element={<EventDetails />} />
              
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
