import { FaTrash, FaEdit, FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomeButton from "../components/HomeButton";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";
import axios from "axios";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/customers`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setCustomers(response.data.reverse());
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <>
      <HomeButton />
      <BackButton backto="/admin" />

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Customers</h2>
        <Link
          to="/customers/new"
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
        >
          Add New Customer
        </Link>

        {/* Show loading spinner while data is being fetched */}
        {loading ? (
          <Loading />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  {["Name", "Email", "Phone Number", "Actions"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr
                    key={customer._id}
                    onClick={() => navigate(`/customers/${customer._id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <span
                        className="truncate max-w-xs hover:bg-gray-100"
                        title={customer.name}
                      >
                        {customer.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <span
                        className="max-w-xs hover:whitespace-normal hover:bg-gray-100"
                        title={customer.email}
                      >
                        {customer.email}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <span
                        className="truncate max-w-xs hover:whitespace-normal hover:bg-gray-100"
                        title={customer.phone}
                      >
                        {customer.phone}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/customers/${customer._id}`);
                        }}
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                      >
                        <FaInfoCircle />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          navigate(`/customers/${customer._id}/edit`);
                        }}
                        className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (
                            window.confirm(
                              "Are you sure you want to delete this customer?"
                            )
                          ) {
                            try {
                              await axios.delete(
                                `${
                                  import.meta.env.VITE_BACKEND_URL
                                }api/customers/${customer._id}`,
                                {
                                  headers: {
                                    Authorization:
                                      localStorage.getItem("token"),
                                  },
                                }
                              );
                              // Refresh customer list here if needed
                              setCustomers((prevCustomers) =>
                                prevCustomers.filter(
                                  (c) => c._id !== customer._id
                                )
                              );
                            } catch (error) {
                              console.error("Error deleting customer:", error);
                            }
                          }
                        }}
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerList;
