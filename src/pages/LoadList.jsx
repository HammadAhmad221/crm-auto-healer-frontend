import { FaTrash, FaEdit, FaInfoCircle, FaPrint } from "react-icons/fa";
import StatusDropdown from "../components/StatusDropdown";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomeButton from "../components/HomeButton";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";
import axios from "axios";

const LoadList = () => {
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoadsAndInvoices = async () => {
      try {
        const loadsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/loads`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        const invoicesResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/invoices`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        const invoices = invoicesResponse.data;

        const loadsWithInvoices = loadsResponse.data.map((load) => ({
          ...load,
          hasInvoice: invoices.some((invoice) => invoice.loadId === load._id),
        }));

        setLoads(loadsWithInvoices.reverse());
      } catch (error) {
        console.error("Error fetching loads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoadsAndInvoices();
  }, []);

  const statusOptions = ["Delivered", "In Transit", "In Progress"];

  const handleUpdateStatus = async (loadId, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}api/loads/${loadId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setLoads((prevLoads) =>
        prevLoads.map((load) =>
          load._id === loadId ? { ...load, status: newStatus } : load
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      <HomeButton />
      <BackButton backto="/admin" />

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Loads</h2>
        <Link
          to="/loads/new"
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
        >
          Add New Load
        </Link>
        {loading ? (
          <Loading />
        ) : (
          <div className="scrollbar-custom overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  {[
                    "Load Id",
                    "Vehicle",
                    "Customer",
                    "Driver",
                    "Amount",
                    "Pickup Location",
                    "Delivery Location",
                    "Status",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className={`px-6 py-3 border-b border-gray-200 bg-gray-50 ${
                        header == "Actions" ? "text-center" : "text-left"
                      } text-xs font-medium text-gray-500 uppercase tracking-wider`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loads.map((load) => (
                  <tr
                    key={load._id}
                    onClick={() => navigate(`/loads/${load._id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <span className="truncate max-w-xs" title={load?.loadId}>
                        {load?.loadId}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <span
                        className="truncate max-w-xs"
                        title={load?.vehicleId?.make}
                      >
                        {load?.vehicleId?.make}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <span
                        className="truncate max-w-xs"
                        title={load?.customerId?.name}
                      >
                        {load?.customerId?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <span
                        className="truncate max-w-xs"
                        title={load?.driverId?.name}
                      >
                        {load?.driverId?.name || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <span className="truncate max-w-xs" title={load?.amount}>
                        {load?.amount || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <span
                        className="truncate max-w-xs"
                        title={load?.pickupLocation}
                      >
                        {load?.pickupLocation}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <span
                        className="truncate max-w-xs"
                        title={load?.deliveryLocation}
                      >
                        {load?.deliveryLocation}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <StatusDropdown
                        currentStatus={load.status}
                        onChangeStatus={(newStatus) =>
                          handleUpdateStatus(load._id, newStatus)
                        }
                        options={statusOptions}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-gray-200 flex gap-1 justify-end">
                      {load.invoiceId && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/loads/generatedInvoice", {
                              state: {
                                loadId: load._id,
                                customerId: load.customerId._id,
                                amount: load.amount,
                                invoiceId: load.invoiceId,
                              },
                            });
                          }}
                          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                        >
                          <FaPrint />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/loads/${load._id}`);
                        }}
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                      >
                        <FaInfoCircle />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          navigate(`/loads/${load._id}/edit`);
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
                              "Are you sure you want to delete this load?"
                            )
                          ) {
                            try {
                              await axios.delete(
                                `${import.meta.env.VITE_BACKEND_URL}api/loads/${
                                  load._id
                                }`,
                                {
                                  headers: {
                                    Authorization:
                                      localStorage.getItem("token"),
                                  },
                                }
                              );
                              setLoads((prevLoads) =>
                                prevLoads.filter((c) => c._id !== load._id)
                              );
                            } catch (error) {
                              console.error("Error deleting load:", error);
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

export default LoadList;
