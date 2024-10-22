import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GenerateInvoiceFromLoad from "./pages/GenerateInvoiceFromLoads";
import CommunicationLogs from "./pages/CommunicationLogs";
import CustomerDetails from "./pages/CustomerDetails";
import VehicleDetails from "./pages/VehicleDetails";
import InvoiceDetails from "./pages/invoiceDetails";
import DriverDetails from "./pages/DriverDetails";
import CustomerList from "./pages/CustomerList";
import InvoiceStats from "./pages/InvoiceStats";
import CustomerForm from "./pages/CustomerForm";
import ProtectedRoute from "./ProtectedRoutes";
import UserDetails from "./pages/UserDetails";
import VehicleList from "./pages/VehicleList";
import VehicleForm from "./pages/VehicleForm";
import LoadDetails from "./pages/LoadDetails";
import InvoiceList from "./pages/InvoiceList";
import InvoiceForm from "./pages/InvoiceForm";
import DriverList from "./pages/DriverList";
import DriverForm from "./pages/DriverForm";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";
import LoadList from "./pages/LoadList";
import LoadForm from "./pages/LoadForm";
import Register from "./pages/Register";
import Login from "./pages/Login";

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
