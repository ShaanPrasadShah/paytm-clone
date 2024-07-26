import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { SignIn } from './pages/Signin'
import { SignUp } from './pages/Signup'
import { DashBoard } from './pages/Dashboard'
import { Transfer } from './pages/Transfer'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/send' element={<Transfer/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
