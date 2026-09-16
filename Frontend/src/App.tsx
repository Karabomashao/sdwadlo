import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom';
// import './App.css';
import LoginPage from './pages/authentication/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProtectedRoute from './components/AdminProtectedRoute';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      {/* public route */}
      <Route path='/login' element={<LoginPage/>}/>

      {/* Admin */}
      <Route element={<AdminProtectedRoute/>}>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
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
