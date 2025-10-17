import './App.css'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard'
import Users from './pages/admin/Users'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='users' element={<Users />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
