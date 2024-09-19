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
import VehicleList from './pages/VehicalList';
import VehicleDetails from './pages/VehicleDetails';
import VehicleForm from './pages/VehicleForm';
import LoadList from './pages/LoadList';
import LoadDetails from './pages/LoadDetails';
import LoadForm from './pages/LoadForm';
import QuoteList from './pages/QuoteList';
import QuoteForm from './pages/QuoteForm';
import QuoteDetails from './pages/QuoteDetails';
import InvoiceList from './pages/InvoiceList';
import InvoiceForm from './pages/InvoiceForm';
import InvoiceDetails from './pages/invoiceDetails';
import CommunicationLogList from './pages/CommunicationLogList';
import CommunicationLogDetails from './pages/CommuncationLogDetails';
import CommunicationLogForm from './pages/CommunicationLogForm';
import DriverDashboard from './pages/DriverDashboard';
import DriverProfile from './pages/DriverProfile';
import AssignedLoads from './pages/AssignedLoads';
// import PersonalSchedule from './pages/PersonalSchedule'; 
import ConditionReport from './pages/ConditionReports'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Dashboard />} />
        {/* routes for admin */}
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
      {/* Vehicle routes */}
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/vehicles/new" element={<VehicleForm isEdit={false} />} />
        <Route path="/vehicles/:id/edit" element={<VehicleForm isEdit={true} />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
      {/* Load routes */}
        <Route path="/loads" element={<LoadList />} />
        <Route path="/loads/new" element={<LoadForm isEdit={false} />} />
        <Route path="/loads/:id/edit" element={<LoadForm isEdit={true} />} />
        <Route path="/loads/:id" element={<LoadDetails />} />
      {/* Quote routes */}
        {/* <Route path="/quotes" element={<QuoteList />} />
        <Route path="/quotes/new" element={<QuoteForm isEdit={false} />} />
        <Route path="/quotes/:id/edit" element={<QuoteForm isEdit={true} />} />
        <Route path="/quotes/:id" element={<QuoteDetails />} /> */}
      {/* Invoice routes */}
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/invoices/new" element={<InvoiceForm isEdit={false} />} />
        <Route path="/invoices/:id/edit" element={<InvoiceForm isEdit={true} />} />
        <Route path="/invoices/:id" element={<InvoiceDetails />} />
      {/* CommunicationLog routes */}
        <Route path="/communicationlogs" element={<CommunicationLogList />} />
        <Route path="/communicationlogs/new" element={<CommunicationLogForm isEdit={false} />} />
        <Route path="/communicationlogs/:id/edit" element={<CommunicationLogForm isEdit={true} />} />
        <Route path="/communicationlogs/:id" element={<CommunicationLogDetails />} />
      {/* routes for drivers */}
        <Route path="/driver-dashboard" element={<DriverDashboard/>}/>
        <Route path="/profile" element={<DriverProfile />} />
        <Route path="/assigned-loads" element={<AssignedLoads />} />
        {/* <Route path="/schedule" element={<PersonalSchedule />} /> */}
        <Route path="/condition-reports/:loadId" element={<ConditionReport />} />
      </Routes>
    </Router>
  );
}

export default App;
