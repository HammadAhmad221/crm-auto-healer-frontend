import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/customers/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    fetchCustomer();
  }, [id]);

  if (!customer) return <Loading />;

  return (
    <>
      <HomeButton />
      <BackButton backto="/customers" />

      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Customer Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-lg font-medium mb-2 detailsTruncate">
              <strong>Name:</strong> {customer?.name}
            </p>
            <br />
            <p className="text-lg font-medium mb-2 detailsTruncate">
              <strong>Email:</strong> {customer?.email}
            </p>
            <br />
            <p className="text-lg font-medium mb-2 detailsTruncate">
              <strong>Phone:</strong> {customer?.phone}
            </p>
            <br />
            <p className="text-lg font-medium mb-2 detailsTruncate">
              <strong>Created At:</strong> {new Date(customer.createdAt).toLocaleDateString()}
            </p>
            <br />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <Link
            to={`/customers/${id}/edit`}
            className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
          >
            Edit Customer
          </Link>
          <button
            onClick={async () => {
              if (
                window.confirm("Are you sure you want to delete this customer?")
              ) {
                try {
                  await axios.delete(
                    `${import.meta.env.VITE_BACKEND_URL}api/customers/${id}`,
                    {
                      headers: {
                        Authorization: localStorage.getItem("token"),
                      },
                    }
                  );
                  navigate("/customers");
                } catch (error) {
                  console.error("Error deleting customer:", error);
                }
              }
            }}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
