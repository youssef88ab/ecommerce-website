import './App.css'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard'
import Users from './pages/admin/Users'
import Orders from './pages/admin/Orders'
import Payments from './pages/admin/Payments'
import Products from './pages/admin/Products'
import OrderDetails from './pages/admin/OrderDetails'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='users' element={<Users />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/payments' element={<Payments />} />
          <Route path='/products' element={<Products />} />
          <Route path='/orderDetails' element={<OrderDetails />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
