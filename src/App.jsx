import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate
} from 'react-router-dom'

import Homepage from './pages/Homepage';
import Show from './pages/Show';
import Structure from './layouts/Structure';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import WhoWeAre from './pages/WhoWeAre';
import { DataProvider } from './context/DataContext';
import ScrollToTop from './components/ScrollToTop';


function App() {

  return (
    <>
      <DataProvider>
        <BrowserRouter>
        <ScrollToTop/>
          <Routes>
            <Route path='/' element={<Structure />}>
              <Route index element={<Navigate to='/Homepage' replace />} />
              <Route path='/Homepage' element={<Homepage />} />
              <Route path='/Show' element={<Show />} />
              <Route path='/WhoWeAre' element={<WhoWeAre />} />
              <Route path='/ProductDetail/:id' element={<ProductDetail />} />
              <Route path='/NotFound' element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </>
  )
}

export default App
