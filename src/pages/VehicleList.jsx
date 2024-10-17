import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HomeButton from "../components/HomeButton";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaInfoCircle } from "react-icons/fa";
import Loading from "../components/Loading";
import CustomerDetailsModal from "../components/CustomerModal";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    // Function to open modal with customer details
    const handleCustomerClick = (customer) => {
      setSelectedCustomer(customer);
      setIsModalOpen(true);
    };
  
    // Function to close modal
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedCustomer(null);
    };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/vehicles`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <>
      <HomeButton />
      <BackButton backto="/admin"/>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Vehicles</h2>
        <Link
          to="/vehicles/new"
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
        >
          Add New Vehicle
        </Link>
      {loading?(<Loading/>):(        <div className="scrollbar-custom overflow-x-auto">
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle._id} onClick={() => navigate(`/vehicles/${vehicle._id}`)}>
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
                    <span className="truncate max-w-xs cursor-pointer hover:text-blue-800 hover:underline" onClick={(e) => { 
                        e.stopPropagation();
                      handleCustomerClick(vehicle?.customer)
                      }} title={vehicle?.customer?.name}>
                      {vehicle?.customer?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/vehicles/${vehicle._id}`)
                      }}
                      className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                    >
                      <FaInfoCircle />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/vehicles/${vehicle._id}/edit`)
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
                                  Authorization: localStorage.getItem("token"),
                                },
                              }
                            );
                            setVehicles((prevVehicles) =>
                              prevVehicles.filter((c) => c._id !== vehicle._id)
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
        </div>)}
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
