import React from 'react'
import Authenticate from './Authenticate';
import Signup from './CreateAcc';
import DashBoard from './DashBoard';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
const App = () => {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Authenticate />} />
            <Route path='signup' element={<Signup />} />
            <Route path='dash' element={<DashBoard />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}
export default App;
