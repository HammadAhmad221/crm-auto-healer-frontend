// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import CustomerList from './pages/CustomerList';
// import CustomerDetails from './pages/CustomerDetails';
// import CustomerForm from './pages/CustomerForm';
// import DriverList from './pages/DriverList';
// import DriverDetails from './pages/DriverDetails';
// import DriverForm from './pages/DriverForm';
// import UserList from './pages/UserList'; 
// import UserDetails from './pages/UserDetails'; 
// import UserForm from './pages/UserForm'; 
// import VehicleList from './pages/VehicalList';
// import VehicleDetails from './pages/VehicleDetails';
// import VehicleForm from './pages/VehicleForm';
// import LoadList from './pages/LoadList';
// import LoadDetails from './pages/LoadDetails';
// import LoadForm from './pages/LoadForm';
// import QuoteList from './pages/QuoteList';
// import QuoteForm from './pages/QuoteForm';
// import QuoteDetails from './pages/QuoteDetails';
// import InvoiceList from './pages/InvoiceList';
// import InvoiceForm from './pages/InvoiceForm';
// import InvoiceDetails from './pages/invoiceDetails';
// import CommunicationLogList from './pages/CommunicationLogList';
// import CommunicationLogDetails from './pages/CommuncationLogDetails';
// import CommunicationLogForm from './pages/CommunicationLogForm';
// import DriverDashboard from './pages/DriverDashboard';
// import DriverProfile from './pages/DriverProfile';
// import AssignedLoads from './pages/AssignedLoads';
// // import PersonalSchedule from './pages/PersonalSchedule'; 
// import ConditionReport from './pages/ConditionReports'; 
// import InvoiceStats from './pages/InvoiceStats';
// import GenerateInvoiceFromLoad from './pages/GenerateInvoiceFromLoads';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/admin" element={<Dashboard />} />
//         {/* routes for admin */}
//       {/* customer routes  */}
//         <Route path="/customers" element={<CustomerList />} />
//         <Route path="/customers/new" element={<CustomerForm  isEdit={false}/>} />
//         <Route path="/customers/:id/edit" element={<CustomerForm isEdit={true} />} />
//         <Route path="/customers/:id" element={<CustomerDetails />} />
//       {/* Driver routes */}
//         <Route path="/drivers" element={<DriverList />} />
//         <Route path="/drivers/new" element={<DriverForm isEdit={false} />} />
//         <Route path="/drivers/:id/edit" element={<DriverForm isEdit={true} />} />
//         <Route path="/drivers/:id" element={<DriverDetails />} />
//       {/* User routes */}
//         <Route path="/users" element={<UserList />} />
//         <Route path="/users/new" element={<UserForm isEdit={false} />} />
//         <Route path="/users/:id/edit" element={<UserForm isEdit={true} />} />
//         <Route path="/users/:id" element={<UserDetails />} />
//       {/* Vehicle routes */}
//         <Route path="/vehicles" element={<VehicleList />} />
//         <Route path="/vehicles/new" element={<VehicleForm isEdit={false} />} />
//         <Route path="/vehicles/:id/edit" element={<VehicleForm isEdit={true} />} />
//         <Route path="/vehicles/:id" element={<VehicleDetails />} />
//       {/* Load routes */}
//         <Route path="/loads" element={<LoadList />} />
//         <Route path="/loads/new" element={<LoadForm isEdit={false} />} />
//         <Route path="/loads/generatedInvoice" element={<GenerateInvoiceFromLoad />} />
//         <Route path="/loads/:id/edit" element={<LoadForm isEdit={true} />} />
//         <Route path="/loads/:id" element={<LoadDetails />} />
        
//         <Route path="/invoices" element={<InvoiceList />} />
//         <Route path="/invoices/new" element={<InvoiceForm isEdit={false} />} />
//         <Route path="/invoices/:id/edit" element={<InvoiceForm isEdit={true} />} />
//         <Route path="/invoices/:id" element={<InvoiceDetails />} />
//         <Route path="/invoices/stats" element={<InvoiceStats />} />
//       {/* CommunicationLog routes */}
//         <Route path="/communicationlogs" element={<CommunicationLogList />} />
//         <Route path="/communicationlogs/new" element={<CommunicationLogForm isEdit={false} />} />
//         <Route path="/communicationlogs/:id/edit" element={<CommunicationLogForm isEdit={true} />} />
//         <Route path="/communicationlogs/:id" element={<CommunicationLogDetails />} />
//       {/* routes for drivers */}
//         <Route path="/driver-dashboard" element={<DriverDashboard/>}/>
//         <Route path="/profile" element={<DriverProfile />} />
//         <Route path="/assigned-loads" element={<AssignedLoads />} />
//         {/* <Route path="/schedule" element={<PersonalSchedule />} /> */}
//         <Route path="/condition-reports/:loadId" element={<ConditionReport />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

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
import VehicleList from './pages/VehicleList';
import VehicleDetails from './pages/VehicleDetails';
import VehicleForm from './pages/VehicleForm';
import LoadList from './pages/LoadList';
import LoadDetails from './pages/LoadDetails';
import LoadForm from './pages/LoadForm';
import InvoiceList from './pages/InvoiceList';
import InvoiceForm from './pages/InvoiceForm';
import InvoiceDetails from './pages/invoiceDetails';
import CommunicationLogs from './pages/CommunicationLogs';
import InvoiceStats from './pages/InvoiceStats';
import GenerateInvoiceFromLoad from './pages/GenerateInvoiceFromLoads';
import ProtectedRoute from './ProtectedRoutes';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Customer routes */}
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <CustomerList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/new"
          element={
            <ProtectedRoute>
              <CustomerForm isEdit={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/:id/edit"
          element={
            <ProtectedRoute>
              <CustomerForm isEdit={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/:id"
          element={
            <ProtectedRoute>
              <CustomerDetails />
            </ProtectedRoute>
          }
        />
        {/* Driver routes */}
        <Route
          path="/drivers"
          element={
            <ProtectedRoute>
              <DriverList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/drivers/new"
          element={
            <ProtectedRoute>
              <DriverForm isEdit={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/drivers/:id/edit"
          element={
            <ProtectedRoute>
              <DriverForm isEdit={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/drivers/:id"
          element={
            <ProtectedRoute>
              <DriverDetails />
            </ProtectedRoute>
          }
        />
        {/* User routes */}
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/new"
          element={
            <ProtectedRoute>
              <UserForm isEdit={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id/edit"
          element={
            <ProtectedRoute>
              <UserForm isEdit={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <UserDetails />
            </ProtectedRoute>
          }
        />
        {/* Vehicle routes */}
        <Route
          path="/vehicles"
          element={
            <ProtectedRoute>
              <VehicleList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicles/new"
          element={
            <ProtectedRoute>
              <VehicleForm isEdit={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicles/:id/edit"
          element={
            <ProtectedRoute>
              <VehicleForm isEdit={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicles/:id"
          element={
            <ProtectedRoute>
              <VehicleDetails />
            </ProtectedRoute>
          }
        />
        {/* Load routes */}
        <Route
          path="/loads"
          element={
            <ProtectedRoute>
              <LoadList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loads/new"
          element={
            <ProtectedRoute>
              <LoadForm isEdit={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loads/generatedInvoice"
          element={
            <ProtectedRoute>
              <GenerateInvoiceFromLoad />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loads/:id/edit"
          element={
            <ProtectedRoute>
              <LoadForm isEdit={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loads/:id"
          element={
            <ProtectedRoute>
              <LoadDetails />
            </ProtectedRoute>
          }
        />
        {/* Invoice routes */}
        <Route
          path="/invoices"
          element={
            <ProtectedRoute>
              <InvoiceList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoices/new"
          element={
            <ProtectedRoute>
              <InvoiceForm isEdit={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoices/:id/edit"
          element={
            <ProtectedRoute>
              <InvoiceForm isEdit={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoices/:id"
          element={
            // <ProtectedRoute>
              <InvoiceDetails />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/invoices/stats"
          element={
            <ProtectedRoute>
              <InvoiceStats />
            </ProtectedRoute>
          }
        />
        {/* CommunicationLog routes */}
        <Route
          path="/communicationlogs"
          element={
            <ProtectedRoute>
              <CommunicationLogs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
