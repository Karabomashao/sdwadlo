import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom';
// import './App.css';
import LoginPage from './pages/authentication/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoutes from './components/ProtectedRoutes';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Customers from './pages/admin/Customers';
import Analytics from './pages/admin/Analytics';
import Marketing from './pages/admin/Marketing';
import AdminSettings from './pages/admin/AdminSettings';
import SideNav from './components/SideNav';
import SignUpPage from './pages/authentication/SignUp';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      {/* public route */}

      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/' element={<AdminDashboard/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>

      {/* Admin */}
      <Route element={<ProtectedRoutes allowedRoles={['STORE_ADMIN']}/>}>
        <Route path='/admin' element={<SideNav/>}>
          <Route path='dashboard' element={<AdminDashboard/>}/>
          <Route path='products' element={<Products/>}/>
          <Route path='orders' element={<Orders/>}/>
          <Route path='customers' element={<Customers/>}/>
          <Route path='analytics' element={<Analytics/>}/>
          <Route path='marketing' element={<Marketing/>}/>
          <Route path='settings' element={<AdminSettings/>}/>
        </Route>
      </Route>
    </>
  ))
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
