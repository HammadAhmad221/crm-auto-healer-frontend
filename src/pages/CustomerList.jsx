import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HomeButton from "../components/HomeButton";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const fetchCustomers = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/customers`,
        {
          params: { page, limit: 20 },
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const { data, totalPages } = response.data;
      // setCustomers((prev) => [...prev, ...data]);
            // Ensure there are no duplicate customers
            setCustomers((prev) => {
              const newCustomers = data.filter(
                (newCustomer) => !prev.some((existingCustomer) => existingCustomer._id === newCustomer._id)
              );
              return [...prev, ...newCustomers];
            });
      setHasMore(page < totalPages);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial data
    fetchCustomers(currentPage);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 50 &&
        hasMore &&
        !loading
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchCustomers(currentPage);
    }
  }, [currentPage]);

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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                {["Name", "Email", "Phone Number", "Created At", "Actions"].map(
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
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {customer.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 flex gap-2">
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
                              `${import.meta.env.VITE_BACKEND_URL}api/customers/${customer._id}`,
                              {
                                headers: {
                                  Authorization: localStorage.getItem("token"),
                                },
                              }
                            );
                            setCustomers((prev) =>
                              prev.filter((c) => c._id !== customer._id)
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
          {loading && <Loading />}
        </div>
      </div>
    </>
  );
};

export default CustomerList;
