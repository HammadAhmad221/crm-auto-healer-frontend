import { FaTrash, FaEdit, FaInfoCircle } from "react-icons/fa";
import CustomerDetailsModal from "../components/CustomerModal";
import React, { useEffect, useState } from "react";
import HomeButton from "../components/HomeButton";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import axios from "axios";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false); // Set to false to control loading state
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // Control if there are more vehicles to load
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const fetchVehicles = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/vehicles`,
        {
          params: { page, limit: 20 }, // Send page and limit for pagination
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const { data, totalPages } = response.data;

      // Append the new vehicles to the existing ones
      // setVehicles((prevVehicles) => [...prevVehicles, ...data]);
      setVehicles((prev) => {
        const newVehicles = data.filter(
          (newVehicle) => !prev.some((existingVehicle) => existingVehicle._id === newVehicle._id)
        );
        return [...prev, ...newVehicles];
      });

      // Check if there are more pages to fetch
      setHasMore(page < totalPages);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial vehicles
    fetchVehicles(currentPage);
  }, []); // Load the first page of vehicles on component mount

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 50 &&
        hasMore &&
        !loading
      ) {
        setCurrentPage((prevPage) => prevPage + 1); // Load the next page
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchVehicles(currentPage); // Fetch next page of vehicles
    }
  }, [currentPage]);

  return (
    <>
      <HomeButton />
      <BackButton backto="/admin" />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Vehicles</h2>
        <Link
          to="/vehicles/new"
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
        >
          Add New Vehicle
        </Link>
          <div className="scrollbar-custom overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Make
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr
                    key={vehicle._id}
                    onClick={() => navigate(`/vehicles/${vehicle._id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <span className="truncate max-w-xs" title={vehicle.make}>
                        {vehicle.make}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <span className="truncate max-w-xs" title={vehicle.model}>
                        {vehicle.model}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <span className="truncate max-w-xs" title={vehicle.year}>
                        {vehicle.year}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 ">
                      <span
                        className="truncate max-w-xs cursor-pointer hover:text-blue-800 hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCustomerClick(vehicle?.customer);
                        }}
                        title={vehicle?.customer?.name}
                      >
                        {vehicle?.customer?.name || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <span className="truncate max-w-xs" title={new Date(vehicle.createdAt).toLocaleDateString()}>
                        {new Date(vehicle.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/vehicles/${vehicle._id}`);
                        }}
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                      >
                        <FaInfoCircle />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/vehicles/${vehicle._id}/edit`);
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
                              "Are you sure you want to delete this vehicle?"
                            )
                          ) {
                            try {
                              await axios.delete(
                                `${
                                  import.meta.env.VITE_BACKEND_URL
                                }api/vehicles/${vehicle._id}`,
                                {
                                  headers: {
                                    Authorization:
                                      localStorage.getItem("token"),
                                  },
                                }
                              );
                              setVehicles((prevVehicles) =>
                                prevVehicles.filter(
                                  (c) => c._id !== vehicle._id
                                )
                              );
                            } catch (error) {
                              console.error("Error deleting vehicle:", error);
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
            {loading && <Loading/>}
          </div>
      </div>
      <CustomerDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        customer={selectedCustomer}
      />
    </>
  );
};

export default VehicleList;
