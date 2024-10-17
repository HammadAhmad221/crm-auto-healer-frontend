import StatusDropdown from "../components/StatusDropdown";
import HomeButton from "../components/HomeButton";
import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaInfoCircle } from "react-icons/fa";
import Loading from "../components/Loading";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/invoices`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const statusOptions = ["Paid", "Unpaid", "Pending"];

  const handleUpdateStatus = async (invoiceId, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}api/invoices/${invoiceId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice._id === invoiceId
            ? { ...invoice, status: newStatus }
            : invoice
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      <HomeButton />
      <BackButton backto="/admin"/>

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Invoices</h2>
        <Link
          to="/invoices/new"
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
        >
          Add New Invoice
        </Link>
{loading?(<Loading/>):(        <div className="scrollbar-custom overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  customer
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Load Id
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pickup Location
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Location
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice._id}>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <span
                      className="truncate max-w-xs hover:bg-gray-100"
                      title={invoice._id}
                    >
                      {invoice?.invoiceId}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <span
                      className="truncate max-w-xs hover:bg-gray-100"
                      title={invoice.customerId?.name}
                    >
                      {invoice.customerId?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <span
                      className="truncate max-w-xs hover:bg-gray-100"
                      title={invoice.loadId?.loadId}
                    >
                      {invoice.loadId?.loadId}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <span
                      className="truncate max-w-xs hover:bg-gray-100"
                      title={invoice.loadId?.pickupLocation}
                    >
                      {invoice.loadId?.pickupLocation}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <span
                      className="truncate max-w-xs hover:bg-gray-100"
                      title={invoice.loadId?.deliveryLocation}
                    >
                      {invoice.loadId?.deliveryLocation}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <span
                      className="truncate max-w-xs hover:bg-gray-100"
                      title={invoice?.amount.toFixed(2)}
                    >
                      {invoice?.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <StatusDropdown
                      currentStatus={invoice.status}
                      onChangeStatus={(newStatus) =>
                        handleUpdateStatus(invoice._id, newStatus)
                      }
                      options={statusOptions}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 flex gap-1">
                    <button
                      onClick={() => navigate(`/invoices/${invoice._id}`)}
                      className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                    >
                      <FaInfoCircle />
                    </button>
                    <button
                      onClick={() => navigate(`/invoices/${invoice._id}/edit`)}
                      className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={async () => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this invoice?"
                          )
                        ) {
                          try {
                            await axios.delete(
                              `${
                                import.meta.env.VITE_BACKEND_URL
                              }api/invoices/${invoice._id}`,
                              {
                                headers: {
                                  Authorization: localStorage.getItem("token"),
                                },
                              }
                            );
                            setInvoices((prevInvoices) =>
                              prevInvoices.filter((c) => c._id !== invoice._id)
                            );
                          } catch (error) {
                            console.error("Error deleting invoice:", error);
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
    </>
  );
};

export default InvoiceList;
