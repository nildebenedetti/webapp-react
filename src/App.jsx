import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from 'react-router-dom'

import Homepage from './pages/Homepage';
import Show from './pages/Show';
import Structure from './layouts/Structure';
import NotFound from './pages/NotFound';


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Structure/>}>
          <Route path='/Homepage' element={<Homepage/>}/>
          <Route path='/Show' element={<Show/>}/>
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
