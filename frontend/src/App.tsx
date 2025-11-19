import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard'
import Users from './pages/admin/Users'
import Orders from './pages/admin/Orders'
import Payments from './pages/admin/Payments'
import Products from './pages/admin/Products'
import OrderDetails from './pages/admin/OrderDetails'
import UserDetails from './pages/admin/UserDetails'
import ProductPage from "./pages/admin/ProductPage.tsx";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path='/users' element={<Users/>}/>
                    <Route path='/users/:id' element={<UserDetails/>}/>
                    <Route path='/orders' element={<Orders/>}/>
                    <Route path='/orders/:id' element={<OrderDetails/>}/>
                    <Route path='/payments' element={<Payments/>}/>
                    <Route path="/products/:id" element={<ProductPage/>}/>
                    <Route path='/products' element={<Products/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App
