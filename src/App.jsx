import { Routes, Route } from 'react-router-dom'
import {
  Login,
  Register,
  Dashboard,
  Trips,
  Destinations,
  Activities,
} from './pages'

import { MainLayout } from './layouts'

import { ProtectedRoute } from './components'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="trips" element={<Trips />} />
        <Route path="destinations/:tripId" element={<Destinations />} />
        <Route path="activities/:destinationId" 
              element={<Activities />} />
      </Route>
    </Routes>
  )
}

export default App
