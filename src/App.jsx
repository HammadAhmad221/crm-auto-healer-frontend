import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CustomerList from './pages/CustomerList';
import CustomerDetails from './pages/CustomerDetails';
import CustomerForm from './pages/CustomerForm';
import DriverList from './pages/DriverList';
import DriverDetails from './pages/DriverDetails';
import DriverForm from './pages/DriverForm';
import UserList from './pages/UserList'; 
import UserDetails from './pages/UserDetails'; 
import UserForm from './pages/UserForm'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Dashboard />} />
      {/* customer routes  */}
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/new" element={<CustomerForm  isEdit={false}/>} />
        <Route path="/customers/:id/edit" element={<CustomerForm isEdit={true} />} />
        <Route path="/customers/:id" element={<CustomerDetails />} />
      {/* Driver routes */}
        <Route path="/drivers" element={<DriverList />} />
        <Route path="/drivers/new" element={<DriverForm isEdit={false} />} />
        <Route path="/drivers/:id/edit" element={<DriverForm isEdit={true} />} />
        <Route path="/drivers/:id" element={<DriverDetails />} />
      {/* User routes */}
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserForm isEdit={false} />} />
        <Route path="/users/:id/edit" element={<UserForm isEdit={true} />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
