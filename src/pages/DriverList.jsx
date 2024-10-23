import { FaTrash, FaEdit, FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomeButton from "../components/HomeButton";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";
import axios from "axios";

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/drivers`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setDrivers(response.data.reverse());
      } catch (error) {
        console.error("Error fetching drivers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <>
      <HomeButton />
      <BackButton backto="/admin" />

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Drivers</h2>
        <Link
          to="/drivers/new"
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
        >
          Add New Driver
        </Link>
        {loading ? (
          <Loading />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  {["Name", "License Number", "Phone Number","Created At" ,"Actions"].map(
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
                {drivers.map((driver) => (
                  <tr
                    key={driver._id}
                    onClick={() => navigate(`/drivers/${driver._id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <span
                        className="truncate max-w-xs hover:bg-gray-100"
                        title={driver.name}
                      >
                        {driver.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <span
                        className="truncate max-w-xs hover:bg-gray-100"
                        title={driver.licenseNumber}
                      >
                        {driver.licenseNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <span
                        className="truncate max-w-xs hover:bg-gray-100"
                        title={driver.contactDetails.phoneNumber}
                      >
                        {driver.contactDetails.phoneNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <span
                        className="truncate max-w-xs hover:bg-gray-100"
                        title={driver.date.split('T')[0]}
                      >
                        {new Date(driver.date).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          navigate(`/drivers/${driver._id}`);
                        }}
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                      >
                        <FaInfoCircle />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          navigate(`/drivers/${driver._id}/edit`);
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
                              "Are you sure you want to delete this driver?"
                            )
                          ) {
                            try {
                              await axios.delete(
                                `${
                                  import.meta.env.VITE_BACKEND_URL
                                }api/drivers/${driver._id}`,
                                {
                                  headers: {
                                    Authorization:
                                      localStorage.getItem("token"),
                                  },
                                }
                              );
                              setDrivers((prevDrivers) =>
                                prevDrivers.filter((c) => c._id !== driver._id)
                              );
                            } catch (error) {
                              console.error("Error deleting driver:", error);
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

export default DriverList;
