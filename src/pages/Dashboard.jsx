import ProfileDropdown from "../components/ProfileDropdown";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [counts, setCounts] = useState();
  const [summary, setSummary] = useState();
  // const [totalEmails, setTotalEmails] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/counts`
        );
        setCounts(response.data.result);
        localStorage.setItem(
          "recordCounts",
          JSON.stringify(response.data.result)
        );
        try {
          const invoiceSummary = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}api/invoices/summary`,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          setSummary(invoiceSummary.data);
          // console.log("invoice data:", invoiceSummary.data);
        } catch (error) {
          console.error("Can not get invoices amount:", error);
        }
      } catch (error) {
        console.error("Failed to fetch record counts");
      }
    };
    fetchCounts();
  }, []);
  useEffect(() => {

    const fetchEmailCount = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}emails/count`);
        // setTotalEmails(response.data.totalEmails);
        localStorage.setItem('logs',response.data.totalEmails);
      } catch (error) {
        console.error('Error fetching email count:', error);
      }
    };
    if(!localStorage.getItem('logs')){
      fetchEmailCount();
    }
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-4">
      <h1 className="pl-4 text-3xl font-bold mb-6">Admin Dashboard</h1>
      <ProfileDropdown />
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Manage Records</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {/* Customers */}
          <Link
            to="/customers"
            className="bg-blue-700 p-4 rounded-lg shadow-md hover:bg-blue-800"
          >
            <div className="flex justify-between">
              <h3 className="text-xl mb-2 font-bold text-white">Customers</h3>
              <h3 className="text-xl font-bold text-white">
                {counts?.customer}
              </h3>
            </div>
            <div
              className="text-white font-bold hover:underline w-20"
              onClick={(e) => {
                e.preventDefault();
                navigate("/customers/new");
              }}
            >
              Add New
            </div>
          </Link>

          {/* Drivers */}
          <Link
            to="/drivers"
            className="bg-green-700 p-4 rounded-lg shadow-md hover:bg-green-800"
          >
            <div className="flex justify-between">
              <h3 className="text-xl mb-2 font-bold text-white">Drivers</h3>
              <h3 className="text-xl font-bold text-white">{counts?.driver}</h3>
            </div>
            <div
              className="text-white font-bold hover:underline w-20"
              onClick={(e) => {
                e.preventDefault();
                navigate("/drivers/new");
              }}
            >
              Add New
            </div>
          </Link>

          {/* Users */}
          <Link
            to="/users"
            className="bg-yellow-700 p-4 rounded-lg shadow-md hover:bg-yellow-800"
          >
            <div className="flex justify-between">
              <h3 className="text-xl mb-2 font-bold text-white">Users</h3>
              <h3 className="text-xl font-bold text-white">{counts?.user}</h3>
            </div>
            <div
              className="text-white font-bold hover:underline w-20"
              onClick={(e) => {
                e.preventDefault();
                navigate("/users/new");
              }}
            >
              Add New
            </div>
          </Link>

          {/* Loads */}
          <Link
            to="/loads"
            className="bg-red-700 p-4 rounded-lg shadow-md hover:bg-red-800"
          >
            <div className="flex justify-between">
              <h3 className="text-xl mb-2 font-bold text-white">Loads</h3>
              <h3 className="text-xl font-bold text-white">{counts?.load}</h3>
            </div>
            <div
              className="text-white font-bold hover:underline w-20"
              onClick={(e) => {
                e.preventDefault();
                navigate("/loads/new");
              }}
            >
              Add New
            </div>
          </Link>

          {/* Invoices */}
          <Link
            to="/invoices"
            className="bg-teal-700 p-4 rounded-lg shadow-md hover:bg-teal-800"
          >
            <div className="flex justify-between">
              <h3 className="text-xl mb-2 font-bold text-white">Invoices</h3>
              <h3 className="text-xl font-bold text-white">
                {counts?.invoice}
              </h3>
            </div>
            <div
              className="text-white font-bold hover:underline w-20"
              onClick={(e) => {
                e.preventDefault();
                navigate("/invoices/new");
              }}
            >
              Add New
            </div>
          </Link>
          {/* Statistics */}
          <Link
            to="/invoices/stats"
            className="bg-orange-700 p-4 rounded-lg shadow-md hover:bg-orange-800 flex justify-between"
          >
            <h3 className="text-xl mb-2 font-bold text-white">Stats</h3>
            <div>
              <h3 className="text-xl font-bold text-white text-right">
                P:{summary?.totalPaid}
              </h3>
              <h3 className="text-xl font-bold text-white text-right">
                U:{summary?.totalUnpaid}
              </h3>
            </div>
          </Link>

          {/* Vehicles */}
          <Link
            to="/vehicles"
            className="bg-orange-700 p-4 rounded-lg shadow-md hover:bg-orange-800"
          >
            <div className="flex justify-between">
              <h3 className="text-xl mb-2 font-bold text-white">Vehicles</h3>
              <h3 className="text-xl font-bold text-white">
                {counts?.vehicle}
              </h3>
            </div>
            <div
              className="text-white font-bold hover:underline w-20"
              onClick={(e) => {
                e.preventDefault();
                navigate("/vehicles/new");
              }}
            >
              Add New
            </div>
          </Link>

          {/* Communication Logs */}
          <Link
            to="/communicationlogs"
            className="bg-pink-700 p-4 rounded-lg shadow-md hover:bg-pink-800"
          >
            <div className="flex justify-between">
              <h3 className="text-xl mb-2 font-bold text-white">
                Communication Logs
              </h3>
              <h3 className="text-xl font-bold text-white">
                {localStorage.getItem('logs')}
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
